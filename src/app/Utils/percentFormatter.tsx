export const percentFormatter = (value: number) : string => {
  const formattedValue = Math.abs(value).toFixed(2) + '%';
  const arrowSymbol = value > 0 ? '▴' : '▾';

  return `${arrowSymbol} ${formattedValue}`;
};