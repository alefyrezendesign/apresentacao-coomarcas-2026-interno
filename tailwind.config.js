/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        void: '#060709',
        dark: '#0a0d12',
        card: 'rgba(255, 255, 255, 0.045)',
        'card-hover': 'rgba(255, 255, 255, 0.08)',
        subtle: 'rgba(255, 255, 255, 0.1)',
        silver: '#d5dbe4',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 25s linear infinite',
      }
    },
  },
  plugins: [],
}
