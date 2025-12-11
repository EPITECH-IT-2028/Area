/** @type {import("prettier").Config} */
const config = {
  bracketSpacing: true,
  semi: true,
  singleQuote: false,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "^react",
    "^next",
    "<THIRD_PARTY_MODULES>",
    "^@/components/(?!ui)",
    "^@/components/ui",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
