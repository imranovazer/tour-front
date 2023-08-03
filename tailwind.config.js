/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: theme => ({
        'login-back': "url('./src/assetsHeader.png')",
      })
    }
  },
  plugins: [],
};
