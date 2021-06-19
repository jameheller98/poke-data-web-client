module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        btn: '0 2px 5px 0 rgba(0, 0, 0, 0.2)',
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
    },
  },
  variants: {
    extend: {
      inset: ['active'],
      backgroundColor: ['active', 'focus'],
      height: ['last'],
      textAlign: ['even'],
    },
  },
  plugins: [],
};
