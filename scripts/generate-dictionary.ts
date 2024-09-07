// Generates the /src/en-wiktionary.txt file from the Kaikki data file.

import { downloadDictionaryDataIfNecessary } from './utilities/download'
import { type Entry } from './utilities/types'
import { isValid } from './utilities/validation'
import { createReadStream, createWriteStream } from 'node:fs'
import fs from 'node:fs/promises'
import readline from 'node:readline'

function sanitizeWord(word: string, cSpellPrefixesAndSuffixes = false): string {
	const cleanWord = word.replaceAll(/–|—/g, '-').trim()

	if (cSpellPrefixesAndSuffixes) {
		// Replace leading or trailing - with +
		if (cleanWord.startsWith('-')) {
			return `+${cleanWord.slice(1)}`
		}

		if (cleanWord.endsWith('-')) {
			return `${cleanWord.slice(0, -1)}+`
		}

		return cleanWord
	}

	return cleanWord
}

async function readWords(
	filePath: string,
	includePrefixes = false,
	includeSuffixes = false,
	maxWords: number = Number.POSITIVE_INFINITY,
): Promise<{ invalid: string[]; valid: string[] }> {
	const wordSet = new Set<string>()
	const wordSetInvalid = new Set<string>()
	const fileStream = createReadStream(filePath)

	const rl = readline.createInterface({
		crlfDelay: Infinity,
		input: fileStream,
	})

	for await (const line of rl) {
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
				// Cspell:ignore curch curches curchies
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
		invalid: [...wordSetInvalid].sort(),
		valid: [...wordSet].sort(),
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

	if (invalidWords.length > 0) {
		const invalidWordsFile = './data/en-wiktionary-invalid.txt'
		await writeWords(invalidWordsFile, invalidWords)
		console.log(`Wrote ${invalidWords.length} invalid words to "${invalidWordsFile}"`)
	}
}

await main()
