import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'brandorange': 'var(--brand-accent1)',
        'brandgreen': 'var(--brand-accent2)',
        'brandpink': 'var(--brand-accent3)',
        'brandorange-half': 'var(--brand-accent1-opaque)',
        'brandgreen-half': 'var(--brand-accent2-opaque)',
        'brandpink-half': 'var(--brand-accent3-opaque)',
      }
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1025px',
      'xl': '1280px',
      'xxl': '1640px'
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
export default config
