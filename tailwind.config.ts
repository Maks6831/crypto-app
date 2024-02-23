import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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
      'positive-two': '#00B1A7',
      'negative-two':'#FE2264',
      'card-text-gray': '#D1D1D1',
      'carousel-button-color-one': '#7878FA',
      'carousel-button-color-two': '#6161D6',
      'light-stroke-color': '#7878FA',
      'white-color': '#FFFFFF',
      'light-text-color-two': '#191932',
      'light-text-color-three': '#181825',
      'volume-background': '#1E1932',
      'light-bar-color': '#9D62D9',
      'timebar-background-color': '#232336',
      'timebar-text-color':'#A7A7CC',
      'dark-orange' : '#C27721',
      'darker-blue':'#6374C3',
      'brighter-green' : '#30E0A1',
      'light-orange':'#F5AC37',
      'light-yellow':'#F3EB2F',
      'light-blue': '#638FFE',
      'light-green' :'#4DEEE5',
      'dark-red': '#F06142',
      'new-blue':'#5082CF',
      'dark-date-color':'#9E9E9E',
      'dark-convert-color':'#FAFBFE',
      'coin-card-color':'#9D62F9',
      'coin-page-progress':'#D4770C',
      'coin-page-progress-two': '#F8D2A6',
      'edit-button-color': '#3A3978'

      },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
  darkMode: 'class'
}
export default config;
