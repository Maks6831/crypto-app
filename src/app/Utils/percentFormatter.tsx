export const percentFormatter = (value: number) => {
    const fixedNumber = value
    return value > 0 ? <div>&#x25B4; {fixedNumber.toFixed(2)}%</div> : <div>&#x25BE; {Math.abs(fixedNumber).toFixed(2)}%</div>;
  }