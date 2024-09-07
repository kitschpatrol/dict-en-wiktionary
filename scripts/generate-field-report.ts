/* eslint-disable max-depth */
import { downloadDictionaryDataIfNecessary } from './utilities/download'
import { type Entry } from './utilities/types'
import { isValid } from './utilities/validation'
import { createReadStream } from 'node:fs'
import fs from 'node:fs/promises'
import readline from 'node:readline'

type Report = {
	categories: string[]
	poss: string[]
	tags: string[]
	words: string[]
}

function validCategory(category: string): boolean {
	// Regex test for a number of words
	return !/(prefixed|suffixed)/.test(category)
}

async function generateReport(
	filePath: string,
	maxWords: number = Number.POSITIVE_INFINITY,
): Promise<Report> {
	const fileStream = createReadStream(filePath)

	const rl = readline.createInterface({
		crlfDelay: Infinity,
		input: fileStream,
	})

	const reportSet = {
		categories: new Map<string, number>(),
		poss: new Map<string, number>(),
		tags: new Map<string, number>(),
		words: new Map<string, number>(),
	}

	// Helper function to increment the count of a word in the report set
	const incrementCount = (map: Map<string, number>, key: string) => {
		map.set(key, (map.get(key) ?? 0) + 1)
	}

	for await (const line of rl) {
		const entry = JSON.parse(line) as Entry

		// Generated report:
		// categories: 14491
		// poss: 26
		// tags: 559
		// words: 963439

		if (isValid(entry, { limitCharacters: true, minLength: 2 })) {
			for (const sense of entry.senses) {
				for (const tag of sense.tags ?? []) {
					incrementCount(reportSet.tags, tag)
				}

				for (const category of sense.categories ?? []) {
					if (validCategory(category.name)) {
						incrementCount(reportSet.categories, category.name)
					}

					for (const parentCategory of category.parents) {
						if (validCategory(parentCategory)) {
							incrementCount(reportSet.categories, parentCategory)
						}
					}
				}
			}

			incrementCount(reportSet.words, entry.word)
			incrementCount(reportSet.poss, entry.pos)

			if (reportSet.words.size >= maxWords) {
				break
			}
		}
	}

	const formatReport = (map: Map<string, number>): string[] =>
		[...map.entries()]
			.sort((a, b) => b[1] - a[1]) // Sort by frequency in descending order
			.map(([key, count]) => `${key} (${count})`)

	return {
		categories: formatReport(reportSet.categories),
		poss: formatReport(reportSet.poss),
		tags: formatReport(reportSet.tags),
		words: formatReport(reportSet.words),
	}
}

async function main() {
	const kaikkiDataFile = await downloadDictionaryDataIfNecessary()

	// Read (streams)
	const report = await generateReport(kaikkiDataFile)

	console.log(`Generated report:`)
	for (const [key, value] of Object.entries(report)) {
		console.log(`  ${key}: ${value.length}`)
	}

	// Write
	const reportFile = './data/field-report.json'
	await fs.writeFile(reportFile, JSON.stringify(report, undefined, 2))
}

await main()
