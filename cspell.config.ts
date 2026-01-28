import { cspellConfig } from '@kitschpatrol/cspell-config'

export default cspellConfig({
	ignorePaths: ['./src/en-wiktionary.txt'],
	import: ['@kitschpatrol/cspell-config', './cspell-ext.json'],
})
