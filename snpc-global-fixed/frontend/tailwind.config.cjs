module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brandBlue: '#38b6ff',
        accentRed: '#d41b23',
        neutralDark: '#1f2937'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
      }
    }
  },
  plugins: []
}
