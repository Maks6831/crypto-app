export const numberFormatter = (
  value: number,
  isPercent: boolean,
  currency: string
): string => {
  const formattedValue = Math.abs(value).toFixed(2);
  const typeCheckedValue = isPercent
    ? formattedValue + "%"
    : parseFloat(formattedValue) > 10
    ? currency + Math.round(parseFloat(formattedValue)).toLocaleString()
    : currency + formattedValue;
  const arrowSymbol = value > 0 ? "▴" : "▾";

  return `${arrowSymbol} ${typeCheckedValue}`;
};
