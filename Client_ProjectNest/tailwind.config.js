/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#dbdbdb",
        light: "#B4B4B8",
        background: "#0C0C0C",
        backgroundlight: "#141627",
        primary: "#212731",
        secondary: "#31363f",
        accent: "#1f92b5",
      },
      backgroundImage: {
        loginbackground: "url('/public/bg.jpg')",
      },
    },
  },
  plugins: [],
};
