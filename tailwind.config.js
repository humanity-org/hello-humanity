/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        container: '69.375rem', // 1110px
      },
      fontFamily: {
        spaceGrotesk: ['Space Grotesk', 'sans-serif'],
      },
      padding: {
        page: '2.760416667%',
      },
    },
  },
  plugins: [],
}
