/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          lime:   '#c8ff57',
          pink:   '#ff2d78',
          blue:   '#00d4ff',
          purple: '#bf7aff',
          yellow: '#ffe033',
        },
        void: {
          DEFAULT: '#06060a',
          2: '#0d0d16',
          3: '#13131f',
          4: '#1a1a2a',
        },
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        mono:    ['"Fira Code"', 'monospace'],
        body:    ['"Outfit"', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
        'flicker':    'flicker 4s linear infinite',
        'scan':       'scan 6s linear infinite',
        'fadeup':     'fadeup 0.6s ease both',
      },
      keyframes: {
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 16px #c8ff5740' },
          '50%':     { boxShadow: '0 0 40px #c8ff57, 0 0 80px #c8ff5730' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-14px)' },
        },
        flicker: {
          '0%,19%,21%,23%,25%,54%,56%,100%': { opacity: 1 },
          '20%,24%,55%': { opacity: 0.6 },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        fadeup: {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'pixel-grid': `linear-gradient(rgba(200,255,87,0.04) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(200,255,87,0.04) 1px, transparent 1px)`,
        'glow-radial': 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(200,255,87,0.12) 0%, transparent 70%)',
      },
      backgroundSize: {
        'pixel': '28px 28px',
      },
    },
  },
  plugins: [],
}
