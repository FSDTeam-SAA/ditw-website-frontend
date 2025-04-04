import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "14px",
          lg: "20px",
        },
        screens: {
          sm: "100%",
          md: "100%",
          lg: "1440px",
        },
      },
      colors: {
        primary: {
          DEFAULT: "#224260",
        },
        secondary: {
          DEFAULT: "#01080E",
        },
      },
    },
  },
  plugins: [],
};
export default config;
