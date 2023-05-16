const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './node_modules/flowbite-react/**/*.js',
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      spacing: {
        460: '460px',
        200: '200px',
      },
      boxShadow: {
        card: '0 2px 40px 0 rgba(0, 0, 0, 0.08)',
        cardHover: '0 2px 40px 0 rgba(13, 0, 255, 0.2)',
      },
      maxWidth: {
        1432: '1432px',
      },
      fontFamily: {
        sans: ['sans-serif'],
        poppins: ['Poppins'],
        raleway: ['Raleway'],
        arsenal: ['Arsenal'],
      },
      letterSpacing: {
        2: '2px',
        5: '5px',
      },
      fontSize: {
        18: '18px',
        52: '52px',
        122: '122px',
      },
      colors: {
        dark: '#1d2349',
        highlight: '#5850ec',
        cool: '#939BD6',
        light: '#e7eaed',
        midway: '#2e2929',
        neutral: '#827979',
        lighter: '#F6F6F6',
        lightest: '#FCFCFC',
        botanical: '#1d2349',
        yasBackground: '#fefbf7',
        yasLink: '#bba18e',
        yasBackgroundDark: '#e9e9e9',
        yasBackgroundDark2: '#4a4e6b',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
};
