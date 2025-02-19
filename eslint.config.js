import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["src/**/*.{js,mjs,cjs,ts,vue}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},

  {
    ignores: ["src/components/ui/**", "src-tauri", "node_modules"],
  },

  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // Ignore parameters that start with '_'
        },
      ],
    },
  },
];