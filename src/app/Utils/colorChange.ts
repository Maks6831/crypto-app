export const colorChange = (value: number, theme: string | undefined) : string => {
    const positive = theme === 'light' ? '#00B1A7' : '#01F1E3';
    return value > 0 ? positive : '#FE2264';
  }