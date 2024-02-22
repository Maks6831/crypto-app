export const moneyConverter = (value : number | undefined, decimal : number, isPriceGraph:boolean) => {
    if(!value){
        return '';
    } else {
        const array = ['','ths', 'mln', 'bln', 'tln'];
        let index: number = 0
        while(value >=1000){
            value /=1000;
            index++;
        }
        const newValue = index === 0 ? value < 1 ? `${value.toPrecision(2)}` : `${value.toFixed(2)}`: `${value.toFixed(decimal)} ${isPriceGraph ? 'K': `${array[index]}`}`
        return newValue;
    }
}

