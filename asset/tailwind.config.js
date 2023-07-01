const THEME = require('@app/asset/theme/index');

module.exports = {
  purge: ['../component/src/**/*.{js,jsx,ts,tsx}', '../apps/frontend/public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        ...THEME.theme_colors,
        ...THEME.system_colors
      },
      fontFamily: {
        ...THEME.font_family
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
