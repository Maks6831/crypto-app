export interface ConverterData {
    prices:        Array<[number,number]>;
    market_caps:   Array<[number,number]>;
    total_volumes: Array<[number,number]>;
}

export interface ConverterObject {
    id : string;
    time : number;
    data : ConverterData;
}

export interface ConverterTypes {
    id: string;
    name : string;
    symbol : string;
    thumb: string;
}

export interface ConvertionData {
    first: string;
    second: string;
    prices : Array<number[]>;
}

export const converterObjects: ConverterObject[] = [
    {
        id: "1",
        time: 1643222400,
        data: {
            prices: [[100, 1643222400], [105, 1643222500]], 
            market_caps: [[5000000, 1643222400], [5100000, 1643222500]],
            total_volumes: [[2000000, 1643222400], [2050000, 1643222500]] 
        }
    }
];
