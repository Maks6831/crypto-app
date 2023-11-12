export const moneyConverter = (value : number | undefined) => {
    if(!value){
        return '';
    } else {
        const array = ['','ths', 'mln', 'bln', 'tln'];
        let index: number = 0
        while(value >=1000){
            value /=1000;
            index++;
        }
        const newValue = `${value.toFixed(3)} ${array[index]}`
        return newValue;
    }
}