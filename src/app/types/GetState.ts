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
    coins: Coin2[]
    amount: string
    loading: boolean
    error: string
  }
  
  export interface Coin2 {
    id: string
    symbol: string
    name: string
    image: string
    current_price: number
    market_cap: number
    market_cap_rank: number
    fully_diluted_valuation: number
    total_volume: number
    high_24h: number
    low_24h: number
    price_change_24h: number
    price_change_percentage_24h: number
    market_cap_change_24h: number
    market_cap_change_percentage_24h: number
    circulating_supply: number
    total_supply: number
    max_supply?: number
    ath: number
    ath_change_percentage: number
    ath_date: string
    atl: number
    atl_change_percentage: number
    atl_date: string
    roi?: Roi2
    last_updated: string
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
    total_market_cap: TotalMarketCap
    total_volume: TotalVolume
    market_cap_percentage: MarketCapPercentage
    market_cap_change_percentage_24h_usd: number
    updated_at: number
  }
  
  export interface TotalMarketCap {
    btc: number
    eth: number
    ltc: number
    bch: number
    bnb: number
    eos: number
    xrp: number
    xlm: number
    link: number
    dot: number
    yfi: number
    usd: number
    aed: number
    ars: number
    aud: number
    bdt: number
    bhd: number
    bmd: number
    brl: number
    cad: number
    chf: number
    clp: number
    cny: number
    czk: number
    dkk: number
    eur: number
    gbp: number
    gel: number
    hkd: number
    huf: number
    idr: number
    ils: number
    inr: number
    jpy: number
    krw: number
    kwd: number
    lkr: number
    mmk: number
    mxn: number
    myr: number
    ngn: number
    nok: number
    nzd: number
    php: number
    pkr: number
    pln: number
    rub: number
    sar: number
    sek: number
    sgd: number
    thb: number
    try: number
    twd: number
    uah: number
    vef: number
    vnd: number
    zar: number
    xdr: number
    xag: number
    xau: number
    bits: number
    sats: number
  }
  
  export interface TotalVolume {
    btc: number
    eth: number
    ltc: number
    bch: number
    bnb: number
    eos: number
    xrp: number
    xlm: number
    link: number
    dot: number
    yfi: number
    usd: number
    aed: number
    ars: number
    aud: number
    bdt: number
    bhd: number
    bmd: number
    brl: number
    cad: number
    chf: number
    clp: number
    cny: number
    czk: number
    dkk: number
    eur: number
    gbp: number
    gel: number
    hkd: number
    huf: number
    idr: number
    ils: number
    inr: number
    jpy: number
    krw: number
    kwd: number
    lkr: number
    mmk: number
    mxn: number
    myr: number
    ngn: number
    nok: number
    nzd: number
    php: number
    pkr: number
    pln: number
    rub: number
    sar: number
    sek: number
    sgd: number
    thb: number
    try: number
    twd: number
    uah: number
    vef: number
    vnd: number
    zar: number
    xdr: number
    xag: number
    xau: number
    bits: number
    sats: number
  }
  
  export interface MarketCapPercentage {
    btc: number
    eth: number
    usdt: number
    bnb: number
    sol: number
    xrp: number
    usdc: number
    steth: number
    ada: number
    avax: number
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
  