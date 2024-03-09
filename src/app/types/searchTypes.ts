export interface SearchTypes {
    coins:      Coin[];
    exchanges:  Exchange[];
    icos:       any[];
    categories: Category[];
    nfts:       Nft[];
}

export interface Category {
    id:   number;
    name: string;
}

export interface Coin {
    id:              string;
    name:            string;
    api_symbol:      string;
    symbol:          string;
    market_cap_rank: number;
    thumb:           string;
    large:           string;
    date?:           string;
    uid?:            string;
    amount?:         string;
}

export interface Exchange {
    id:          string;
    name:        string;
    market_type: MarketType;
    thumb:       string;
    large:       string;
}

export enum MarketType {
    Spot = "spot",
}

export interface Nft {
    id:     string;
    name:   string;
    symbol: string;
    thumb:  string;
}


export const exampleAsset: Coin = {
    id: "",
    name: "Example Asset",
    api_symbol: "EXM",
    symbol: "$EXM",
    market_cap_rank: 1,
    thumb: "url/to/thumb/image.jpg",
    large: "url/to/large/image.jpg"
};