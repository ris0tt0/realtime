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
          contrastText: 'white',
        },
        secondary: {
          main: 'blue',
          light: 'blue',
          dark: 'blue',
          contrastText: 'white',
        },
        error: {
          main: 'blue',
          light: 'blue',
          dark: 'blue',
          contrastText: 'white',
        },
        warning: {
          main: 'blue',
          light: 'blue',
          dark: 'blue',
          contrastText: 'white',
        },
        info: {
          main: 'blue',
          light: 'blue',
          dark: 'blue',
          contrastText: 'white',
        },
        success: {
          main: 'blue',
          light: 'blue',
          dark: 'blue',
          contrastText: 'white',
        },
        text: {
          primary: '#fff',
          secondary: '#fff',
          disabled: '#fff',
          icon: '#fff',
        },
        background: {
          primary: '#121212',
          secondary: '#121212',
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
