import { includeIgnoreFile } from "@eslint/compat";
import eslint from "@eslint/js";
import { type Linter } from "eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import perfectionist from "eslint-plugin-perfectionist";
import securityPlugin from "eslint-plugin-security";
import turboPlugin from "eslint-plugin-turbo";
import unicornPlugin from "eslint-plugin-unicorn";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig } from "eslint/config";
import path from "node:path";
import tseslint from "typescript-eslint";

export const baseConfig = defineConfig(
  // .gitignoreで無視されているファイルもESLintの対象から除外する
  includeIgnoreFile(path.join(import.meta.dirname, "../../.gitignore")),
  // 個別に指定して除外するファイルやディレクトリ
  {
    ignores: [
      "dist/**",
      "**/*.config.*",
      "**/*.d.ts",
      ".cache/**",
      ".next/**",
      "out/**",
      "build/**",
      "coverage/**",
      "postcss-config.js",
    ],
  },
  {
    // ESlintの推奨ルールとTypeScript ESLintの推奨ルールをベースにする
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    // 対象とするファイルを指定する
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    // 使用するプラグインを指定する
    plugins: {
      import: importPlugin,
      turbo: turboPlugin,
      "unused-imports": unusedImports,
    },
    rules: {
      // TypeScript
      // 配列の型を `T[]` `Array<T>` のどちらかで統一するルール
      "@typescript-eslint/array-type": "off",

      // any型の使用を禁止するルール
      "@typescript-eslint/no-explicit-any": "off",

      // 型安全でない引数の使用を警告するルール
      "@typescript-eslint/no-unsafe-argument": "warn",

      // promiseを返す関数で、awaitを使用していない場合に警告するルール
      "@typescript-eslint/no-floating-promises": "warn",

      // オブジェクト型を `type` `interface` のどちらかで統一するルール
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],

      // 型のインポートを する際に、`import type` を使用することを推奨するルール
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        // fixStyle: "inline-type-imports" 型とモジュールの両方をインポートする場合、同じ行で宣言できる
        // prefer: "type-imports" 型をインポートする際は `type` キーワードを使用することを推奨する
        { fixStyle: "inline-type-imports", prefer: "type-imports" },
      ],
      // Promiseを返す関数で、voidを返す関数を渡すことを禁止するルール
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { attributes: false } },
      ],

      // nullの可能性がある値に対して、非nullアサーション演算子（`!`）の使用を禁止するルール
      "@typescript-eslint/no-non-null-assertion": "error",

      // 条件式が常に真または偽になる条件を禁止するルール
      "@typescript-eslint/no-unnecessary-condition": [
        "error",
        // allowConstantLoopConditions: true while(true) など、用途が明確な定数条件式を許可するオプション
        { allowConstantLoopConditions: true },
      ],

      // 使われていない変数や引数をエラーにするルール
      // ただし、引数や変数の名前がアンダースコア（`_`）で始まる場合は、使用されていなくてもエラーにしない
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          vars: "all",
          varsIgnorePattern: "^_",
        },
      ],

      // async関数内で、awaitを使用していない場合にエラーにするルール
      "@typescript-eslint/require-await": "off",

      // Code style
      // 関数の定義スタイルを宣言式（function declaration）に統一するルール
      "func-style": ["error", "declaration", { allowArrowFunctions: false }],

      // 型インポート時に指定子に直接typeをつけるルール
      "import/consistent-type-specifier-style": ["error", "prefer-inline"],

      // 同じパスから複数回インポートすることを禁止するルール
      "import/no-duplicates": "error",

      // コールバック関数を定義する際に、アロー関数を使用することを推奨するルール
      "prefer-arrow-callback": ["error", { allowNamedFunctions: false }],

      // 文字列の連結にテンプレートリテラルを使用することを強制するルール
      "prefer-template": "error",

      // Turbo
      // 宣言されていない環境変数の使用を警告するルール
      "turbo/no-undeclared-env-vars": "warn",
      // Unused imports (replaces @typescript-eslint/no-unused-vars)
      // 使われていないインポートをエラーにするルール
      "unused-imports/no-unused-imports": "error",
      // 使われていない変数や引数を警告にするルール
      "unused-imports/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          vars: "all",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  // Unicorn
  // 変数名やファイル名などの特定の命名パターンを禁止するルール
  {
    extends: [unicornPlugin.configs.recommended],
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    rules: {
      // 変数名やファイル名などの略語を禁止するルールをオフにする
      "unicorn/prevent-abbreviations": "off",
    },
  },
  // Perfectionist
  // プロパティやインポートの順序をアルファベット順に強制するルール
  {
    extends: [perfectionist.configs["recommended-natural"]],
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    rules: {
      "perfectionist/sort-imports": [
        "error",
        {
          customGroups: [
            {
              elementNamePattern: [
                "^react$",
                "^react/.+",
                "^react-native$",
                "^react-native/.+",
              ],
              groupName: "react",
              modifiers: ["value"],
              selector: "external",
            },
            {
              elementNamePattern: ["^next$", "^next/.+"],
              groupName: "next",
              modifiers: ["value"],
              selector: "external",
            },
          ],
          groups: [
            "type-import",
            { newlinesBetween: 1 },
            "react",
            "next",
            ["value-builtin", "value-external"],
            { newlinesBetween: 1 },
            "value-internal",
            { newlinesBetween: 1 },
            ["value-parent", "value-sibling", "value-index"],
            ["side-effect-style", "side-effect", "style"],
            "unknown",
          ],
          internalPattern: ["^@repo(/.+)?$", "^~/.+"],
          newlinesBetween: 1,
          order: "asc",
          sortSideEffects: true,
          type: "natural",
        },
      ],
    },
  },
  // Security
  // 脆弱性のあるコードパターンを検出するルール
  {
    extends: [securityPlugin.configs.recommended as Linter.Config],
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        // Resolve TS config relative to where ESLint is executed (each package runs `eslint .`).
        tsconfigRootDir: process.cwd(),
      },
    },
    linterOptions: { reportUnusedDisableDirectives: true },
  },
  eslintConfigPrettier,
);
