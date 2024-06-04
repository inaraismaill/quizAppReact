/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      colors: {
        customYellow: '#fffd47',
        customPurple: '#ED10E5',
      },
      backgroundColor: {
        'white-39': 'rgba(194, 194, 194, 0.16)',
      },
    }
   
  },
  plugins: [],
}