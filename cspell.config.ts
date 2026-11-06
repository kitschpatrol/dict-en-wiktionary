import { cspellConfig } from '@kitschpatrol/cspell-config'

export default cspellConfig({
	ignorePaths: ['./src/en-wiktionary.txt', '**/changelog.md'],
	import: ['@kitschpatrol/cspell-config', './cspell-ext.json'],
	words: ['chagent'],
})
