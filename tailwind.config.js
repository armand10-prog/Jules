/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zedia: {
          dark: '#141413',
          card: '#1F1E1B',
          muted: '#292724',
          border: '#D6D3CD',
          light: '#FAF9F6',
          cream: '#F4F2EC',
          accent: '#2563eb',
          accentHover: '#1d4ed8',
          success: '#16a34a',
          warning: '#ca8a04',
          danger: '#dc2626',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
