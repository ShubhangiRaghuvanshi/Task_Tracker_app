// postcss.config.cjs
module.exports = {
  plugins: [
    require('@tailwindcss/postcss'), // Use the new postcss plugin for Tailwind
    require('autoprefixer'),
  ],
};


