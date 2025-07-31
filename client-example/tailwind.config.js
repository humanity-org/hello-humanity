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
        container: '68.375rem', // 1110px
      },
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
      },
      padding: {
        page: '2.760416667%',
      },
      colors: {
        primary: '#BA5400',
        primaryHover: '#F2A969',
        secondary: '#94F85F',
        secondaryHover: '#C3FBA5',
        background: '#EDFCEC',
        text: '#0F1514',
        neutral: '#EEEEEE',
      },
    },
  },
  plugins: [],
}
