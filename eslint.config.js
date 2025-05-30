import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'
import pluginQuery from '@tanstack/eslint-plugin-query'
import jsxA11y from 'eslint-plugin-jsx-a11y'

import tseslint from 'typescript-eslint'

const tsNamingConventionRules = {
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: ['./tsconfig.json'],
      tsconfigRootDir: process.cwd(),
    },
  },
  rules: {
    'ts/naming-convention': [
      'warn',
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
        custom: {
          regex: '^T[A-Z]',
          match: true,
        },
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
    ],
  },
}


export default antfu(
  {
    react: true,
    typescript: true,
    formatters: true,
    ignores: ['migrations/**/*', 'next-env.d.ts', './src/app/(payload)/admin/importMap.js', './src/migrations/**/*', './src/payload/migrations/**/*'],
  },
  ...pluginQuery.configs['flat/recommended'],
  jsxA11y.flatConfigs.recommended,
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  {
    rules: {
      'antfu/no-top-level-await': 'off', // Allow top-level await
      'style/brace-style': ['error', '1tbs'], // Use the default brace style
      'ts/consistent-type-definitions': ['error', 'type'], // Use `type` instead of `interface`
      'react/prefer-destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
      'node/prefer-global/process': 'off', // Allow using `process.env`,
      'eslint-comments/no-unlimited-disable': 'off', // Allow unlimited disable comments,
      'react-refresh/only-export-components': 'off', // Allow exporting components that are not used in the same file,
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: [
            'Dockerfile.*',
          ],
        },
      ],
    },
  },
  tsNamingConventionRules
)
