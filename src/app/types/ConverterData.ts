export interface ConverterData {
    prices:        Array<number[]>;
    market_caps:   Array<number[]>;
    total_volumes: Array<number[]>;
}

export interface ConverterObject {
    name : string;
    time : string;
    data : ConverterData;
}
