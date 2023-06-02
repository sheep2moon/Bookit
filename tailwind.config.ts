import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#251B37",
        secondary: "#372948",
        accent: "#FFCACA",
        light: "#FFECEF",
      },
    },
  },
  plugins: [],
} satisfies Config;
