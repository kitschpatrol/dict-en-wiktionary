import { cspellConfig } from '@kitschpatrol/cspell-config'

export default cspellConfig({
	ignorePaths: ['./data/en-wiktionary-invalid.txt', './src/en-wiktionary.txt'],
	import: ['@kitschpatrol/cspell-config', './cspell-ext.json'],
})
