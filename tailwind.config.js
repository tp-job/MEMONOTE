/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom colors from @theme
        'deep-night': '#1e202c',
        'charcoal-grey': '#31323e',
        'lush-violet': '#60519b',
        'velvet-violet': '#8d84d0',
        'elegant-violet': '#b9bbe8',
        'misty-lavender': '#bfc0d1',
        'lush-peach': '#ff5e57',
        'misty-peach': '#f27272',
        
        // Light theme colors
        'light-bg': '#ffffff',
        'light-surface': '#f8fafc',
        'light-surface-2': '#f1f5f9',
        'light-text': '#1e202c',
        'light-text-secondary': '#64748b',
        'light-border': '#e2e8f0',
        'light-accent': '#60519b',
        'light-accent-hover': '#8d84d0',
        
        // Dark theme colors
        'dark-bg': '#1e202c',
        'dark-surface': '#31323e',
        'dark-surface-2': '#4a4b57',
        'dark-text': '#f8fafc',
        'dark-text-secondary': '#bfc0d1',
        'dark-border': '#4a4b57',
        'dark-accent': '#8d84d0',
        'dark-accent-hover': '#b9bbe8',
      },
    },
  },
  plugins: [],
}
