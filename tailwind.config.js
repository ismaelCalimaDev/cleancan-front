/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'principal': '#99D0D3',
        'green': '#2E958C',
        'back_input': '#D9DEE6',
        'text:input': '#565656',
        'icons': '#073B80',
        'carne': '#FCE0D5',
        'gradient': '#322274',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')
,require('@tailwindcss/forms')
,require('@tailwindcss/line-clamp')
,require('@tailwindcss/typography')
],
};
