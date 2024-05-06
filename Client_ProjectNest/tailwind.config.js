/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Poppins",
    },
    extend: {
      colors: {
        text: "#dbdbdb",
        light: "#B4B4B8",
        backgroundlight: "#17181a",
        background: "#202123",
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
