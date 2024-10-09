// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#1c1c1e',
        'highlight-yellow': '#f5bf42',
      },
    },
  },
  plugins: [],
};
