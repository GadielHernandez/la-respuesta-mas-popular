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
          DEFAULT: '#3B82F6', // blue-500
          dark: '#1E40AF', // blue-800
          light: '#93C5FD', // blue-300
        },
        secondary: {
          DEFAULT: '#10B981', // green-500
          dark: '#047857', // green-700
          light: '#6EE7B7', // green-300
        },
        danger: '#EF4444', // red-500
        warning: '#F59E0B', // amber-500
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
