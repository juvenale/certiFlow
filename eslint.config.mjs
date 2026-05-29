import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      ".netlify/**",
      "node_modules/**",
      "dist/**",
      "out/**"
    ]
  },
  ...nextVitals
];

export default eslintConfig;
