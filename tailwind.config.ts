import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-0': '#0A0F1E',
        'bg-1': '#0E1426',
        'bg-2': '#111827',
        'bg-3': '#161F33',
        'teal': '#00D4B4',
        'amber': '#F5A623',
        'ink': '#F0F4FF',
        'ink-2': '#8896B3',
        'ink-3': '#5A6885',
        'border': '#1E2A40',
        'border-2': '#2A3855',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['Space Mono', 'JetBrains Mono', 'ui-monospace', 'monospace'],
        sans: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
