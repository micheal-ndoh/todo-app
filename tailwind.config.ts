import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.{css,scss}',
    '../../styles/**/*.{css,scss}',
    '../../src/styles/**/*.{css,scss}',
    '../../src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f9fafb',
          500: '#6b7280',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
}

module.exports = config