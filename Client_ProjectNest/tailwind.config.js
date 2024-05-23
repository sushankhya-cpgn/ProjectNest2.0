/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js", // Add this line
  ],
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
        loginbackground: "url('/public/sc.jpg')",
      },
    },
  },
  plugins: [],
};
