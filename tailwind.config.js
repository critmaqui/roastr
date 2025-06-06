/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'roastr-orange': '#f97316',
        'bolt-blue': '#289cf0',
        'spotify-green': '#1ED760',
        'spotify-black': '#191414',
        'spotify-white': '#FFFFFF',
        'orange-neon': '#ff6b35',
        'pink-neon': '#ff006e',
        'purple-neon': '#8338ec',
        'blue-neon': '#3a86ff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        anton: ['Anton', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'bolt-glow-pulse': 'bolt-glow-pulse 2s infinite alternate',
      },
      boxShadow: {
        'glow-orange': '0 0 15px rgba(249, 115, 22, 0.3)',
        'glow-orange-lg': '0 0 30px rgba(249, 115, 22, 0.5)',
        'glow-blue': '0 0 15px rgba(40, 156, 240, 0.3)',
        'glow-blue-lg': '0 0 30px rgba(40, 156, 240, 0.5)',
        'glow-spotify': '0 0 20px rgba(30, 215, 96, 0.5)',
      },
      fontSize: {
        '202': '202px',
      },
    },
  },
  plugins: [],
};