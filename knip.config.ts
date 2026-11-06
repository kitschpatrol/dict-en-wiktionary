import { knipConfig } from '@kitschpatrol/knip-config'

export default knipConfig({
	ignoreBinaries: ['cspell'],
	ignoreDependencies: [
		'@kitschpatrol/chagent', // Typically invoked through bumpp's --execute argument, which Knip doesn't parse
	],
})
