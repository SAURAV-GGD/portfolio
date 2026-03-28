/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sm: {
          red:    '#FF3131',
          gold:   '#FFD700',
          orange: '#FF6B35',
          purple: '#9B59B6',
          white:  '#F0F0F0',
        },
        void: {
          DEFAULT: '#0a0a0a',
          2: '#111111',
          3: '#181818',
          4: '#222222',
        },
      },
      fontFamily: {
        display: ['"Anton"', 'sans-serif'],
        body:    ['"Space Grotesk"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'glitch':       'glitch 3s ease-in-out infinite',
        'float':        'float 6s ease-in-out infinite',
        'grain':        'grain 0.5s steps(6) infinite',
        'fadeup':       'fadeup 0.6s ease both',
        'pulse-glow':   'pulseGlow 2.5s ease-in-out infinite',
        'slide-in':     'slideIn 0.8s ease both',
        'shake':        'shake 0.4s ease-in-out',
        'text-reveal':  'textReveal 0.8s ease both',
        'line-grow':    'lineGrow 1s ease both',
        'border-flow':  'borderFlow 3s linear infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%':      { transform: 'translate(-2px, 2px)' },
          '40%':      { transform: 'translate(-2px, -2px)' },
          '60%':      { transform: 'translate(2px, 2px)' },
          '80%':      { transform: 'translate(2px, -2px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%':      { transform: 'translate(-5%, -10%)' },
          '30%':      { transform: 'translate(3%, -15%)' },
          '50%':      { transform: 'translate(12%, 9%)' },
          '70%':      { transform: 'translate(9%, 4%)' },
          '90%':      { transform: 'translate(-1%, 7%)' },
        },
        fadeup: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 16px #FF313140' },
          '50%':      { boxShadow: '0 0 40px #FF3131, 0 0 80px #FF313130' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-30px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%':      { transform: 'translateX(-4px)' },
          '75%':      { transform: 'translateX(4px)' },
        },
        textReveal: {
          from: { opacity: '0', transform: 'translateY(100%)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        lineGrow: {
          from: { width: '0%' },
          to:   { width: '100%' },
        },
        borderFlow: {
          '0%':   { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '200% 0%' },
        },
      },
    },
  },
  plugins: [],
}
