// Downloads latest word data dump from Wiktionary as processed by kaikki.org,
// and saves it to the data directory.

// The dumps are about 2GB, so this script will take a while to run.

// This could just be a wget or curl...

import { createWriteStream } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import stream from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { type ReadableStream } from 'node:stream/web'
import prettyBytes from 'pretty-bytes'

async function downloadFile(fileUrl: string, outputLocationPath: string) {
	const { body } = await fetch(fileUrl)

	// Clean up existing
	await fs.rm(outputLocationPath, { force: true })

	// Create dir if needed
	await fs.mkdir(path.dirname(outputLocationPath), { recursive: true })

	// eslint-disable-next-line n/no-unsupported-features/node-builtins
	const readable = stream.Readable.fromWeb(body as ReadableStream)

	console.log(`Download started...`)

	let bytesReceived = 0
	const logInterval = 100 * 1024 * 1024
	let nextLogThreshold = logInterval

	readable.on('data', (chunk: Uint8Array) => {
		bytesReceived += chunk.length
		if (bytesReceived >= nextLogThreshold) {
			console.log(`Downloaded: ${prettyBytes(bytesReceived)}`)
			nextLogThreshold += logInterval
		}
	})

	readable.on('end', () => {
		console.log(`Download complete!`)
	})

	readable.on('error', (error) => {
		throw new Error(`Error downloading file: ${String(error)}`)
	})

	// Pipe the readable stream directly to a file
	const fileStream = createWriteStream(outputLocationPath)
	await pipeline(readable, fileStream)
}

/**
 * Downloads the dictionary data if it is not already present.
 *
 * @returns The path to the downloaded dictionary data.
 */
export async function downloadDictionaryDataIfNecessary(): Promise<string> {
	// Download
	const kaikkiDataUrl =
		'https://kaikki.org/dictionary/English/words/kaikki.org-dictionary-English-words.jsonl'

	const kaikkiDataFile = path.join('./data/', path.basename(kaikkiDataUrl))

	try {
		await fs.access(kaikkiDataFile)
		console.warn(`Source data file found: "${kaikkiDataFile}"`)
	} catch {
		console.warn(
			'Downloading word data source file from kaikki.org. This is 2 GB+ and will take a while.',
		)
		await downloadFile(kaikkiDataUrl, kaikkiDataFile)
	}

	return kaikkiDataFile
}
