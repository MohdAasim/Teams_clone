/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teams: {
          purple: '#5b5fc7',
          lightPurple: '#6264A7',
          background: '#f5f5f5',
          sidebar: '#ebebeb',
          hover: '#d0d0d0',
        }
      }
    },
  },
  plugins: [],
}