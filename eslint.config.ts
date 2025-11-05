import { eslintConfig } from '@kitschpatrol/eslint-config'

export default eslintConfig({
	rules: {
		'node/no-unsupported-features/node-builtins': 'off',
		'unicorn/no-array-sort': 'off',
	},
	type: 'lib',
})
