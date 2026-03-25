/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#2a2a2a',
          100: '#1a1a1a',
          200: '#0f0f0f',
        },
        gold: {
          50: '#f5edd8',
          100: '#e8d9b3',
          200: '#d4b05a',
          300: '#c9a84c',
          400: '#8a6f2e',
        },
      },
      fontFamily: {
        serif: ['DM Serif Display', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}