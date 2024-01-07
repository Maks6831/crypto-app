import { ConverterData, ConverterObject } from "../types/ConverterData";


export const elementExtractor = (key: string, index: number) => (coin: ConverterObject) => coin.data[key as keyof ConverterData].map((arr: [number, number]) => arr[index]) ;