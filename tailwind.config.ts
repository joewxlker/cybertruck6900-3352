import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
      },
      colors: {
        p1: "#151515", // Bright yellow
        s1: "#232323", // Dark background
        s2: "#333333", // Slightly lighter background
        s3: "#444444", // Even lighter background
        t1: "#FFFFFF", // White text
        t2: "#DDDDDD", // Light gray text
        shadow: "rgba(0, 0, 0, 0.2)", // Slight shadow
      },
    },
  },
  plugins: [],
} satisfies Config;
