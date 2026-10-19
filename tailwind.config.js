import defaultTheme from 'tailwindcss/defaultTheme';
export default {
  darkMode: 'class',
  content: ['./resources/views/**/*.blade.php', './app/Filament/**/*.php'],
  theme: {
    extend: {
      fontFamily: { sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', ...defaultTheme.fontFamily.sans] },
      colors: { brand: { 50: '#eff8ff', 100: '#dbeefe', 200: '#bfe3fe', 500: '#2e90fa', 600: '#1570ef', 700: '#175cd3' } },
    },
  },
};
