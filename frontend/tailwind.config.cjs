/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'hsl(0, 100%, 25%)',
        'primary-0': 'hsl(0, 100%, 30%)',
        'primary-1': 'hsl(0, 100%, 25%)',
        'primary-2': 'hsl(0, 100%, 20%)',
        'primary-3': 'hsl(0, 100%, 15%)',
        'primary-4': 'hsl(0, 100%, 10%)',
        'primary-5': 'hsl(0, 100%, 5%)',
        'primary-6': 'hsl(0, 100%, 0%)',
        'border-primary': 'hsl(277, 54%, 55%)',
      },
    },
  },
  plugins: [],
};
