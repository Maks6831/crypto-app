export const moneyConverter = (value : number | undefined, decimal : number) => {
    if(!value){
        return '';
    } else {
        const array = ['','ths', 'mln', 'bln', 'tln'];
        let index: number = 0
        while(value >=1000){
            value /=1000;
            index++;
        }
        const newValue = index === 0 ? value < 1 ? `${value.toPrecision(3)}` : `${value.toFixed(2)}`: `${value.toFixed(decimal)} ${array[index]}`
        return newValue;
    }
}

