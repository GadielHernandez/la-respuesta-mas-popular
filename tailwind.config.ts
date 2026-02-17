import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#fdb42d', // gold
          dark: '#e39402', // gold-dark
          light: '#fed68b', // gold-light
        },
        secondary: {
          DEFAULT: '#4ecdc4', // teal
          dark: '#3ab5ac', // teal-dark
          light: '#6ee7e0', // teal-light
        },
        danger: '#ef4444',
        warning: '#ff8c42',
        game: {
          bg: '#1b2134',
          card: '#232b42',
          section: '#2a3550',
        },
      },
      fontFamily: {
        sans: ['var(--font-nunito)', 'Nunito', 'sans-serif'],
        display: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
