/** @type { import("eslint").Linter.FlatConfig } */
module.exports = {
	root: true,
	extends: [
		'plugin:markdown/recommended',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['html', 'markdown', '@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2022,
		extraFileExtensions: ['.svelte'],
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
		},
	],
	ignorePatterns: ['/build', '/package', 'package-lock.json'],
	rules: {
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
	},
}
