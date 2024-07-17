/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-shadow': '-16px 0px 12px 0px #00000014',
      },
      colors: {
        'brand-color': "#37146B",
        'brand-color-light': '#4D1B95',
        'brand-color-medium': '#6E27D5',
        'color-grey-light': '#595959',
        'bg-grey': '#F8F8F8',
        'grey-light':'#EBEBEB',
        'grey-medium':'#BDBDBD',
        'grey-dark':'#333333',
        'success': '#00B88C',
        'success-light': '#F0FCF9',
        'progress': '#F39C12',
        'progress-light': '#FEF5E6',
        'failed': '#E91F04',
        'failed-light': '#FEF4F2',
      },
    },
  },
  plugins: [],
}

