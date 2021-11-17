module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html', './src/**/typeColor.json'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    flex: {
      '80%': '1 1 80%',
      '75%': '1 1 75%',
      '50%': '1 1 50%',
    },
    extend: {
      animation: {
        slide: 'slide 3.5s ease-in-out forwards',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateY(0%)' },
          '25%': { transform: 'translateY(100%)' },
          '75%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
      },
      colors: {
        green: {
          light: '#ab2',
        },
        gray: {
          light: '#aa9',
        },
      },
      boxShadow: {
        btn: '0 2px 5px 0 rgba(0, 0, 0, 0.2)',
        inner: 'inset 0 1px 4px 1px hsla(0, 0%, 0%, 0.08)',
      },
      height: {
        'fit-content': 'fit-content',
        '9/10': '90%',
      },
      width: {
        'screen-75': '75vw',
      },
      transitionProperty: {
        width: 'width',
      },
      borderWidth: {
        6: '6px',
      },
      margin: {
        1.5: '0.35em',
      },
      backgroundColor: {
        ground: 'rgb(239 187 101)',
        psychic: 'rgb(253 121 187)',
        rock: 'rgb(177 138 116)',
        ghost: 'rgb(86 81 174)',
        poison: 'rgb(123 70 214)',
        dragon: 'rgb(91 84 228)',
        steel: 'rgb(184 184 208)',
        fairy: 'rgb(255 180 219)',
      },
    },
  },
  variants: {
    extend: {
      inset: ['active'],
      backgroundColor: ['active', 'focus'],
      height: ['last'],
    },
  },
  plugins: [],
};
