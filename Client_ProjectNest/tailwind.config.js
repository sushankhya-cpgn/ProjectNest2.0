/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#dbdbdb",
        background: "#03122b",
        primary: "#212731",
        secondary: "#31363f",
        accent: "#1f92b5",
      },
    },
  },
  plugins: [],
};
