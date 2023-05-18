import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5b6e9a",
        secondary: "#213769",
        accent: "#991199",
      },
    },
  },
  plugins: [],
} satisfies Config;
