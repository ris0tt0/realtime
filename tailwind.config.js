const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.{html,js}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: 'blue',
          light: 'blue',
          dark: 'blue',
          contrastText: 'black',
        },
        secondary: {
          main: 'blue',
          light: 'blue',
          dark: 'blue',
          contrastText: 'black',
        },
        error: {
          main: colors.red['500'],
          light: colors.red['400'],
          dark: colors.red['600'],
          contrastText: 'black',
        },
        warning: {
          main: colors.yellow['500'],
          light: colors.yellow['400'],
          dark: colors.yellow['600'],
          contrastText: 'black',
        },
        info: {
          main: colors.sky['500'],
          light: colors.sky['400'],
          dark: colors.sky['600'],
          contrastText: 'black',
        },
        success: {
          main: colors.green['500'],
          light: colors.green['400'],
          dark: colors.green['600'],
          contrastText: 'black',
        },
        text: {
          primary: colors.slate['200'],
          secondary: colors.slate['300'],
          disabled: '#fff',
          icon: '#fff',
        },
        background: {
          primary: colors.slate['700'],
          secondary: colors.slate['800'],
        },
        action: {
          active: '#fff',
          hover: 'gray',
          selected: 'blue',
          disabled: 'black',
          disabledBackground: '#fff',
          focus: 'white',
        },
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin')],
};
