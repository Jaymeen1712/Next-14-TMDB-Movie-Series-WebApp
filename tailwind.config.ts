import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        primary: "rgb(103 232 249)",
      },
      textColor: {
        primary: "rgb(103 232 249)",
      },
      borderColor: {
        primary: "rgb(103 232 249)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
