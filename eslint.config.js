import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import-x";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores(["dist"]),
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        plugins: {
            "import-x": importPlugin,
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        rules: {
            /* ── Indentation: 4 spaces, like Python ── */
            indent: ["error", 4, {
                SwitchCase: 1,
                ignoredNodes: ["ConditionalExpression"],
            }],
            "no-tabs": "error",
            "no-mixed-spaces-and-tabs": "error",

            /* ── Line length: 79 chars, like PEP 8 ── */
            "max-len": ["warn", {
                code: 79,
                tabWidth: 4,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true,
                ignorePattern: "^\\s*import\\s",
            }],

            /* ── Blank lines: clean separation ── */
            "no-multiple-empty-lines": ["error", {
                max: 1,
                maxBOF: 0,
                maxEOF: 1,
            }],
            "padding-line-between-statements": [
                "error",
                { blankLine: "always", prev: "*", next: "return" },
                { blankLine: "always", prev: "block-like", next: "*" },
                { blankLine: "always", prev: "*", next: "block-like" },
                { blankLine: "always", prev: "import", next: "*" },
                {
                    blankLine: "any",
                    prev: "import",
                    next: "import",
                },
            ],

            /* ── Quotes: double, like CLAUDE.md ── */
            quotes: ["error", "double", {
                avoidEscape: true,
            }],
            "jsx-quotes": ["error", "prefer-double"],

            /* ── Semicolons: always ── */
            semi: ["error", "always"],

            /* ── Trailing commas: always (like Black) ── */
            "comma-dangle": ["error", "always-multiline"],

            /* ── Spacing ── */
            "comma-spacing": ["error", {
                before: false,
                after: true,
            }],
            "key-spacing": ["error", {
                beforeColon: false,
                afterColon: true,
            }],
            "keyword-spacing": ["error", {
                before: true,
                after: true,
            }],
            "space-before-blocks": ["error", "always"],
            "space-before-function-paren": ["error", {
                anonymous: "always",
                named: "never",
                asyncArrow: "always",
            }],
            "space-infix-ops": "error",
            "space-in-parens": ["error", "never"],
            "array-bracket-spacing": ["error", "never"],
            "object-curly-spacing": ["error", "always"],
            "computed-property-spacing": ["error", "never"],
            "template-curly-spacing": ["error", "never"],

            /* ── Braces ── */
            curly: ["error", "all"],
            "brace-style": ["error", "1tbs", {
                allowSingleLine: false,
            }],

            /* ── Clean code (Python zen) ── */
            "no-var": "error",
            "prefer-const": "error",
            "no-unused-expressions": "error",
            "no-lonely-if": "error",
            "no-nested-ternary": "error",
            "no-unneeded-ternary": "error",
            "prefer-template": "error",
            eqeqeq: ["error", "always"],
            "no-else-return": "error",
            "no-useless-return": "error",
            "no-console": ["warn", {
                allow: ["warn", "error", "info"],
            }],

            /* ── Import order (like isort) ── */
            "import-x/order": ["error", {
                groups: [
                    "builtin",
                    "external",
                    "internal",
                    "parent",
                    "sibling",
                    "index",
                ],
                pathGroups: [
                    {
                        pattern: "react",
                        group: "external",
                        position: "before",
                    },
                    {
                        pattern: "react-*",
                        group: "external",
                        position: "before",
                    },
                    {
                        pattern: "@/**",
                        group: "internal",
                        position: "before",
                    },
                ],
                pathGroupsExcludedImportTypes: ["react"],
                "newlines-between": "never",
                alphabetize: {
                    order: "asc",
                    caseInsensitive: true,
                },
            }],
            "import-x/newline-after-import": ["error", {
                count: 1,
            }],
            "import-x/no-duplicates": "error",

            /* ── TypeScript specific ── */
            "@typescript-eslint/no-unused-vars": ["error", {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
            }],
            "@typescript-eslint/consistent-type-imports": [
                "error",
                { prefer: "type-imports" },
            ],
            "@typescript-eslint/no-explicit-any": "warn",
        },
    },
]);
