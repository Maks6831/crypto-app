import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      ...colors,
      'light-background': '#f3f5f9',
      'dark-background': '#13121a',
      'purplea' : '#1E1932',
      'purpleb' : '#353570',
      'dark-button-color': '#191925',
      'light-button-color': '#CCCCFA',
      'light-text-color' : '#424286',
      'dark-card': '#191925',
      'positive': '#01F1E3',
      'negative': '#FE2264',
      'card-text-gray': '#D1D1D1',
      'carousel-button-color-one': '#7878FA',
      'carousel-button-color-two': '#6161D6',
      'light-stroke-color': '#7878FA',
      'white-color': '#FFFFFF',
      'light-text-color-two': '#191932',
      'light-text-color-three': '#181825',
      'volume-background': '#1E1932',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  darkMode: 'class'
}
export default config;
