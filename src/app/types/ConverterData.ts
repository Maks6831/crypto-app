export interface ConverterData {
    prices:        Array<number[]>;
    market_caps:   Array<number[]>;
    total_volumes: Array<number[]>;
}

export interface ConverterObject {
    name : string;
    time : number;
    data : ConverterData;
}

export interface ConverterTypes {
    id: string;
    name : string;
    symbol : string;
    thumb: string;
}
