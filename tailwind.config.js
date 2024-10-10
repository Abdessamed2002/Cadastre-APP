/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',  // Include the app directory
    './src/components/**/*.{js,ts,jsx,tsx}',  // Include the components directory
    './src/pages/**/*.{js,ts,jsx,tsx}',  // Include the pages directory (if you use it)
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#FAFAFA',
      },
    },
  },
  plugins: [],
}

