/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // MyTattoo "Flash-Sheet" brand (matches the app's design system)
        ink: '#17120E',
        'ink-soft': '#241B14',
        bone: '#E7DECC',
        'bone-hi': '#F3ECDD',
        sepia: '#B4A184',
        'sepia-deep': '#8C795D',
        blood: '#A62B22',
        'blood-deep': '#7C1E17',
        'paper-line': '#D3C7AE',
        // Back-compat: the site's existing brand.* tokens, remapped to Flash-Sheet
        brand: {
          navy: '#17120E',
          red: '#A62B22',
          'red-dark': '#7C1E17',
          'red-light': '#F4E4E1',
        },
        text: {
          primary: '#17120E',
          secondary: '#4A4034',
          tertiary: '#7A6B54',
        },
      },
      fontFamily: {
        sans: ['Archivo', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Alfa Slab One"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
