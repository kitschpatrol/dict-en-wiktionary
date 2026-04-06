import { mdatConfig } from '@kitschpatrol/mdat-config'
import { execFileSync } from 'node:child_process'
import { open } from 'node:fs/promises'

function getGitLastModified(filePath: string): Date {
	const stdout = execFileSync('git', ['log', '-1', '--format=%ci', '--', filePath], {
		encoding: 'utf8',
	})

	return new Date(stdout.trim())
}

async function countLines(filePath: string): Promise<number> {
	const file = await open(filePath, 'r')
	let count = 0

	try {
		for await (const chunk of file.readableWebStream()) {
			// eslint-disable-next-line ts/no-unsafe-type-assertion
			const bytes = chunk as Uint8Array
			for (const byte of bytes) {
				if (byte === 0x0a) count++
			}
		}
	} finally {
		await file.close()
	}

	return count
}

export default mdatConfig({
	'update-date'() {
		const updateDate = getGitLastModified('./src/en-wiktionary.txt')
		return updateDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
	},
	async 'word-count'() {
		const wordCount = await countLines('./src/en-wiktionary.txt')
		return wordCount.toLocaleString('en-US')
	},
})
