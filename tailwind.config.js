module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6366f1',
          dark: '#818cf8',
        },
        secondary: {
          light: '#1e293b',
          dark: '#e2e8f0',
        },
        background: {
          light: '#ffffff',
          dark: '#0f172a',
        },
        surface: {
          light: '#f8fafc',
          dark: '#1e293b',
        },
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
        'slideIn': 'slideIn 0.3s ease-out forwards',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
