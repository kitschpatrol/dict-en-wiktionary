// Generates the /src/en-wiktionary.txt file from the Kaikki data file.

import { createReadStream, createWriteStream } from 'node:fs'
import fs from 'node:fs/promises'
import type { Entry } from './utilities/types'
import { downloadDictionaryDataIfNecessary } from './utilities/download'
import { isValid } from './utilities/validation'

function sanitizeWord(word: string, cSpellPrefixesAndSuffixes = false): string {
	const cleanWord = word.replaceAll(/–|—/gv, '-').trim()

	if (cSpellPrefixesAndSuffixes) {
		// Replace leading or trailing - with +
		if (cleanWord.startsWith('-')) {
			return `+${cleanWord.slice(1)}`
		}

		return cleanWord.endsWith('-') ? `${cleanWord.slice(0, -1)}+` : cleanWord
	}

	return cleanWord
}

/**
 * Yields each line of a JSONL file, splitting only on `\n`. Node's readline
 * also splits on U+2028 / U+2029, which may legally appear unescaped inside
 * JSON strings in the Kaikki data.
 *
 * @yields {string} Each non-empty line, without the trailing newline.
 */
async function* readJsonLines(filePath: string): AsyncGenerator<string> {
	const fileStream = createReadStream(filePath, { encoding: 'utf8' })
	let buffer = ''
	for await (const chunk of fileStream) {
		buffer += chunk as string
		const lines = buffer.split('\n')
		buffer = lines.pop() ?? ''
		for (const line of lines) {
			if (line.trim() !== '') {
				yield line
			}
		}
	}

	if (buffer.trim() !== '') {
		yield buffer
	}
}

async function readWords(
	filePath: string,
	includePrefixes = false,
	includeSuffixes = false,
	maxWords = Infinity,
): Promise<{ invalid: string[]; valid: string[] }> {
	const wordSet = new Set<string>()
	const wordSetInvalid = new Set<string>()
	for await (const line of readJsonLines(filePath)) {
		const entry = JSON.parse(line) as Entry

		if (
			isValid(entry, {
				excludedCategories: [
					'Misspellings',
					'Censored spellings',
					'English censored spellings',
					'English filter-avoidance spellings',
					'Filter-avoidance spellings',
					'Intentional misspellings',
					// 'Terms with non-redundant manual transliterations'
				],
				excludedPartsOfSpeech: [
					'symbol',
					'det',
					...(includeSuffixes ? [] : ['suffix']),
					...(includePrefixes ? [] : ['prefix']),
				],
				excludedTags: ['archaic', 'Shavian', 'alt-of', 'alternative'],
				// CSpell:ignore curch curches curchies
				excludedWords: ['curch', 'curches', 'curchies'],
				limitCharacters: true,
				minLength: 2,
			})
		) {
			if (
				(includeSuffixes && entry.pos === 'suffix') ||
				(includePrefixes && entry.pos === 'prefix')
			) {
				wordSet.add(sanitizeWord(entry.word, true))
			} else {
				wordSet.add(sanitizeWord(entry.word))
			}

			if (wordSet.size >= maxWords) {
				break
			}
		} else {
			wordSetInvalid.add(entry.word)
		}
	}

	return {
		invalid: [...wordSetInvalid].toSorted(),
		valid: [...wordSet].toSorted(),
	}
}

async function writeWords(filePath: string, words: string[]) {
	await fs.rm(filePath, { force: true })
	const writeStream = createWriteStream(filePath, { flags: 'a' })

	for (const word of words) {
		if (!writeStream.write(`${word}\n`)) {
			await new Promise<void>((resolve) => {
				writeStream.once('drain', resolve)
			})
		}
	}

	writeStream.end()
}

async function main() {
	const kaikkiDataFile = await downloadDictionaryDataIfNecessary()

	// Read (streams)
	const { invalid: invalidWords, valid: words } = await readWords(kaikkiDataFile, true, true)

	// Write
	// TODO header directives?
	const wordsFile = './src/en-wiktionary.txt'
	await writeWords(wordsFile, words)
	console.log(`Wrote ${words.length} words to "${wordsFile}"`)

	if (invalidWords.length === 0) {
		return
	}

	const invalidWordsFile = './data/en-wiktionary-invalid.txt'
	await writeWords(invalidWordsFile, invalidWords)
	console.log(`Wrote ${invalidWords.length} invalid words to "${invalidWordsFile}"`)
}

await main()
