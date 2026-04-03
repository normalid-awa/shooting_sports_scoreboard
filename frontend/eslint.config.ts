import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import eslintJs from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
		plugins: { js },
		extends: [
			eslintJs.configs.recommended,
			tseslint.configs.strictTypeChecked,
			eslintReact.configs["strict-type-checked"],
		],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parser: tseslint.parser,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
]);
