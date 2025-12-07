/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        admin: {
          primary: '#8B5CF6',
          secondary: '#3B82F6',
          accent: '#A78BFA',
          dark: '#1E1B4B',
          light: '#EDE9FE',
        }
      }
    },
  },
  plugins: [],
}
