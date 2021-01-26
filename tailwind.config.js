module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'wave-purple-dark': "url('../background/wave-purple-dark.svg')",
       }),
      fontFamily: {
        'press-start2p': ['"Press Start 2P"', 'cursive'],
      },
      outline: {
        yellow: ['2px solid #fde68a']
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'purple-light': '#48426D'
      }),
      screens: {
        'landscape': {'raw': '(orientation: landscape)'},
        // => @media (orientation: portrait) { ... }
      },
      minWidth: theme => ({
        ...theme('width'),
        '24': '6rem',
        '48': '12rem',
       })
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      visibility: ['hover', 'focus'],
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
