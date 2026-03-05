/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        mint:  '#1fffb6',
        ink:   '#0b0b0b',
        g900:  '#111111',
        g800:  '#1a1a1a',
        g700:  '#272727',
        g500:  '#6b6b6b',
        g300:  '#a0a0a0',
        g100:  '#e0e0e0',
      },
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
