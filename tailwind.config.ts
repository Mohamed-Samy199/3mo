import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { forest: "#102511", signal: "#71bc70", cream: "#f3f3ed" },
      fontFamily: { sans: ["var(--font-dm-sans)", "Arial", "sans-serif"] },
    },
  },
  plugins: [],
};

export default config;
