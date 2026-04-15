/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 🔥 ADD TEKTUR FONT FAMILY
      fontFamily: {
        'tektur': ['Tektur', 'sans-serif'],
      },
      colors: {
        'matrix-green': '#00FF41',
        'matrix-dark-green': '#00D936',
        'cyber-blue': '#00B4D8',
        'hacker-yellow': '#FFD700',
        'glitch-pink': '#FF00FF',
        'glitch-blue': '#00FFFF',
        'glitch-purple': '#a855f7',
        'glitch-whiteish': '#f5008f',
        'terminal-black': '#0A0A0A',
        'terminal-gray': '#121212',
        'hacker-text': '#E0E0E0',
        'terminal-green': '#00FF88',
        'section-dark': '#0D0D0D',
        'section-darker': '#080808',
        'section-darkest': '#060606',
      },
      animation: {
        'glitch': 'glitch 0.5s infinite',
        'glitch-2': 'glitch-2 0.7s infinite',
        'glitch-simple': 'glitch-simple 3s infinite',
        'glitch-clip': 'glitch-clip 5s infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 1s infinite',
        'matrix-rain': 'matrix-rain 20s linear infinite',
        'scan-line': 'scan-line 15s linear infinite',
        'neon-pulse': 'neon-pulse 2s infinite alternate',
        'flicker': 'flicker 3s infinite',
        'hologram': 'hologram 5s ease-in-out infinite',
      },
      keyframes: {
        'glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 1px)' },
          '40%': { transform: 'translate(-1px, -1px)' },
          '60%': { transform: 'translate(2px, -1px)' },
          '80%': { transform: 'translate(1px, 2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'glitch-2': {
          '0%': { transform: 'translate(0)' },
          '10%': { transform: 'translate(1px, -2px)' },
          '30%': { transform: 'translate(-1px, 1px)' },
          '50%': { transform: 'translate(2px, 1px)' },
          '70%': { transform: 'translate(-2px, -1px)' },
          '90%': { transform: 'translate(1px, -1px)' },
          '100%': { transform: 'translate(0)' },
        },
        'glitch-simple': {
          '0%, 100%': { transform: 'translate(0)' },
          '10%': { transform: 'translate(-2px, -2px)' },
          '20%': { transform: 'translate(2px, 2px)' },
          '30%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(2px, -2px)' },
          '50%': { transform: 'translate(-1px, 1px)' },
          '60%': { transform: 'translate(1px, -1px)' },
        },
        'glitch-clip': {
          '0%, 100%': { clipPath: 'inset(0 0 0 0)' },
          '10%': { clipPath: 'inset(15% 0 20% 0)' },
          '20%': { clipPath: 'inset(75% 0 5% 0)' },
          '30%': { clipPath: 'inset(10% 0 80% 0)' },
          '40%': { clipPath: 'inset(0 0 0 0)' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blink: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#00FF41' },
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'neon-pulse': {
          'from': {
            textShadow: '0 0 5px #00FF41, 0 0 10px #00FF41, 0 0 15px #00FF41',
          },
          'to': {
            textShadow: '0 0 10px #00FF41, 0 0 20px #00FF41, 0 0 30px #00FF41',
          },
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        hologram: {
          '0%, 100%': { opacity: 0.1, transform: 'translateY(0px)' },
          '50%': { opacity: 0.3, transform: 'translateY(-5px)' },
        },
      },
      backgroundImage: {
        'circuit': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%2300ff41\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        'binary': "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\"%3E%3Ctext x=\"10\" y=\"20\" font-family=\"monospace\" font-size=\"14\" fill=\"%2300ff41\" opacity=\"0.1\"%3E1010101001%3C/text%3E%3Ctext x=\"30\" y=\"40\" font-family=\"monospace\" font-size=\"14\" fill=\"%2300ff41\" opacity=\"0.1\"%3E0101010110%3C/text%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
}