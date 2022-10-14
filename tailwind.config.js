/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  safelist: [
    'icon',
    'brand',
    {
      pattern: /^icon-*/,
    },
  ],
  theme: {
    fontFamily: {
      sans: ['"Kanit"', '"Helvetica"', '"Arial"', 'sans-serif'],
    },
    extend: {
      colors: {
        white: '#FFFFFF',
        error: '#e55039',
        info: '#3498db',
        success: '#78e08f',
        warning: '#f6b93b',
        transparent: 'transparent',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addComponents }) {
      const components = {};

      addComponents(components);
    }),
  ],
};
