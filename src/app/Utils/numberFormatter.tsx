export const numberFormatter = (
  value: number,
  isPercent: boolean,
  currency: string
): string => {
  const formattedValue = Math.abs(value).toFixed(2);
  const valueOverTen = parseFloat(formattedValue) > 10;
  const largeValueWithCurrency =
    currency + Math.round(parseFloat(formattedValue)).toLocaleString();
  const formattedValueWithCurrency = currency + formattedValue;
  const typeCheckedValue = isPercent
    ? formattedValue + "%"
    : valueOverTen
    ? largeValueWithCurrency
    : formattedValueWithCurrency;
  const arrowSymbol = value > 0 ? "▴" : "▾";

  return `${arrowSymbol} ${typeCheckedValue}`;
};
