import { ConverterData, ConverterObject } from "./ConverterData"

export interface GetState {
    counter: Counter
    carousel: Carousel
    priceChart: PriceChart
    currencyReducer: CurrencyReducer
    coinReducer: CoinReducer
    tableReducer: TableReducer
    globalReducer: GlobalReducer
    searchReducer: SearchReducer
    converterReducer: ConverterReducer
  }
  
  export interface Counter {
    value: number
  }
  
  export interface Carousel {
    coins: Coin[]
    loading: boolean
    error: string
  }
  
  export interface Coin {
    id: string
    symbol: string
    name: string
    image: string
    current_price: number
    market_cap: number
    market_cap_rank: number
    fully_diluted_valuation?: number
    total_volume: number
    high_24h: number
    low_24h: number
    price_change_24h: number
    price_change_percentage_24h: number
    market_cap_change_24h: number
    market_cap_change_percentage_24h: number
    circulating_supply: number
    total_supply?: number
    max_supply?: number
    ath: number
    ath_change_percentage: number
    ath_date: string
    atl: number
    atl_change_percentage: number
    atl_date: string
    roi?: Roi
    last_updated: string
  }
  
  export interface Roi {
    times: number
    currency: string
    percentage: number
  }
  
  export interface PriceChart {
    days: string
    market_caps: number[]
    coinInfo: CoinInfo
    labelsTwo: number[]
    labels: number[]
    prices: number[]
    loading: boolean
    error: string
  }
  
  export interface CoinInfo {
    prices: number[][]
    market_caps: number[][]
    total_volumes: number[][]
  }
  
  export interface CurrencyReducer {
    currency: string
    symbol: string
  }
  
  export interface CoinReducer {
    coin: string
    coinName: string
  }
  
  export interface TableReducer {
    coins: Coin[]
    amount: string
    loading: boolean
    error: string
  }
  
  export interface Coin2 extends Coin {
    sparkline_in_7d: SparklineIn7d
    price_change_percentage_1h_in_currency: number
    price_change_percentage_24h_in_currency: number
    price_change_percentage_7d_in_currency: number
  }
  
  export interface Roi2 {
    times: number
    currency: string
    percentage: number
  }
  
  export interface SparklineIn7d {
    price: number[]
  }
  
  export interface GlobalReducer {
    data: Data
    loading: boolean
    error: string
  }
  
  export interface Data {
    active_cryptocurrencies: number
    upcoming_icos: number
    ongoing_icos: number
    ended_icos: number
    markets: number
    total_market_cap: CurrencyValues
    total_volume: CurrencyValues
    market_cap_percentage: CurrencyValues
    market_cap_change_percentage_24h_usd: number
    updated_at: number
  }
  
  export interface CurrencyValues {
    [currency: string]: number;
  }
  

  
  export interface SearchReducer {
    data: any[]
    loading: boolean
    error: string
  }
  
  export interface ConverterReducer {
    coins: Coin3[]
    loading: boolean
    error: string
    data: ConverterObject[]
    labels: number[]
    prices: number[]
  }
  
  export interface Coin3 {
    id: string
    name: string
    symbol: string
    thumb: string
  }
  