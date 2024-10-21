/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'Raleway': ['Raleway', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        '@font-face': [
          {
            fontFamily: 'Raleway',
            src: 'url("/assets/Raleway-Light.ttf") format("truetype")',
            fontWeight: '300',
            fontStyle: 'normal',
          },
          {
            fontFamily: 'Raleway',
            src: 'url("/assets/Raleway-Medium.ttf") format("truetype")',
            fontWeight: '500',
            fontStyle: 'normal',
          },
          {
            fontFamily: 'Raleway',
            src: 'url("/assets/Raleway-SemiBold.ttf") format("truetype")',
            fontWeight: '600',
            fontStyle: 'normal',
          },
          {
            fontFamily: 'Raleway',
            src: 'url("/assets/Raleway-Bold.ttf") format("truetype")',
            fontWeight: '700',
            fontStyle: 'normal',
          },
        ],
      });
    },
  ],
};
