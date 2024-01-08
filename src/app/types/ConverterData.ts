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
