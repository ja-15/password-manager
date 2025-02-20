import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		screens: {
        xs: "475px",
    },
    boxShadow: {
      100: "2px 2px 0px 0px rgb(0, 0, 0)",
      200: "2px 2px 0px 2px rgb(0, 0, 0)",
      300: "2px 2px 0px 2px rgb(238, 43, 105)",
  },
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
