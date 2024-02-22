export interface CoinPageTypes {
    id:                              string;
    symbol:                          string;
    name:                            string;
    web_slug:                        string;
    asset_platform_id:               string;
    platforms:                       Platforms;
    detail_platforms:                DetailPlatforms;
    block_time_in_minutes:           number;
    hashing_algorithm:               null;
    categories:                      string[];
    preview_listing:                 boolean;
    public_notice:                   null;
    additional_notices:              any[];
    description:                     Description;
    links:                           Links;
    image:                           Image;
    country_origin:                  string;
    genesis_date:                    null;
    contract_address:                string;
    sentiment_votes_up_percentage:   number;
    sentiment_votes_down_percentage: number;
    watchlist_portfolio_users:       number;
    market_cap_rank:                 number;
    market_data:                     MarketData;
    community_data:                  CommunityData;
    status_updates:                  any[];
    last_updated:                    Date;
    tickers:                         Ticker[];
}

export interface CommunityData {
    facebook_likes:              null;
    twitter_followers:           number;
    reddit_average_posts_48h:    number;
    reddit_average_comments_48h: number;
    reddit_subscribers:          number;
    reddit_accounts_active_48h:  number;
    telegram_channel_user_count: number;
}

export interface Description {
    en: string;
}

export interface DetailPlatforms {
    ethereum: Ethereum;
}

export interface Ethereum {
    decimal_place:    number;
    contract_address: string;
}

export enum ID {
    ShibaInu = "shiba-inu",
}

export interface Image {
    thumb: string;
    small: string;
    large: string;
}

export interface Links {
    homepage:                      string[];
    whitepaper:                    string;
    blockchain_site:               string[];
    official_forum_url:            string[];
    chat_url:                      string[];
    announcement_url:              string[];
    twitter_screen_name:           string;
    facebook_username:             string;
    bitcointalk_thread_identifier: null;
    telegram_channel_identifier:   string;
    subreddit_url:                 string;
    repos_url:                     ReposURL;
}

export interface ReposURL {
    github:    any[];
    bitbucket: any[];
}

export interface MarketData {
    current_price:                                { [key: string]: number };
    total_value_locked:                           null;
    mcap_to_tvl_ratio:                            null;
    fdv_to_tvl_ratio:                             null;
    roi:                                          null;
    ath:                                          { [key: string]: number };
    ath_change_percentage:                        { [key: string]: number };
    ath_date:                                     { [key: string]: Date };
    atl:                                          { [key: string]: number };
    atl_change_percentage:                        { [key: string]: number };
    atl_date:                                     { [key: string]: Date };
    market_cap:                                   { [key: string]: number };
    market_cap_rank:                              number;
    fully_diluted_valuation:                      { [key: string]: number };
    market_cap_fdv_ratio:                         number;
    total_volume:                                 { [key: string]: number };
    high_24h:                                     { [key: string]: number };
    low_24h:                                      { [key: string]: number };
    price_change_24h:                             number;
    price_change_percentage_24h:                  number;
    price_change_percentage_7d:                   number;
    price_change_percentage_14d:                  number;
    price_change_percentage_30d:                  number;
    price_change_percentage_60d:                  number;
    price_change_percentage_200d:                 number;
    price_change_percentage_1y:                   number;
    market_cap_change_24h:                        number;
    market_cap_change_percentage_24h:             number;
    price_change_24h_in_currency:                 { [key: string]: number };
    price_change_percentage_1h_in_currency:       { [key: string]: number };
    price_change_percentage_24h_in_currency:      { [key: string]: number };
    price_change_percentage_7d_in_currency:       { [key: string]: number };
    price_change_percentage_14d_in_currency:      { [key: string]: number };
    price_change_percentage_30d_in_currency:      { [key: string]: number };
    price_change_percentage_60d_in_currency:      { [key: string]: number };
    price_change_percentage_200d_in_currency:     { [key: string]: number };
    price_change_percentage_1y_in_currency:       { [key: string]: number };
    market_cap_change_24h_in_currency:            { [key: string]: number };
    market_cap_change_percentage_24h_in_currency: { [key: string]: number };
    total_supply:                                 number;
    max_supply:                                   number;
    circulating_supply:                           number;
    last_updated:                                 Date;
}

export interface Platforms {
    ethereum: string;
}

export interface Ticker {
    base:                      string;
    target:                    string;
    market:                    Market;
    last:                      number;
    volume:                    number;
    converted_last:            { [key: string]: number };
    converted_volume:          { [key: string]: number };
    trust_score:               string;
    bid_ask_spread_percentage: number;
    timestamp:                 Date;
    last_traded_at:            Date;
    last_fetch_at:             Date;
    is_anomaly:                boolean;
    is_stale:                  boolean;
    trade_url:                 null | string;
    token_info_url:            null | string;
    coin_id:                   ID;
    target_coin_id?:           string;
}


export interface Market {
    name:                  string;
    identifier:            string;
    has_trading_incentive: boolean;
}

export const coinPage : CoinPageTypes = {
    id: "shiba-inu",
    symbol: "SHIB",
    name: "Shiba Inu",
    web_slug: "shiba-inu",
    asset_platform_id: "ethereum",
    platforms: {
        ethereum: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
    },
    detail_platforms: {
        ethereum: {
            decimal_place: 18,
            contract_address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
        },
    },
    block_time_in_minutes: 15,
    hashing_algorithm: null,
    categories: ["memecoin"],
    preview_listing: true,
    public_notice: null,
    additional_notices: [],
    description: {
        en: "Shiba Inu is a meme coin inspired by the Shiba dog.",
    },
    links: {
        homepage: ["https://shiba-token.com/"],
        whitepaper: "https://shiba-token.com/whitepaper",
        blockchain_site: ["https://etherscan.io/token/0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE"],
        official_forum_url: ["https://community.shiba-token.com/"],
        chat_url: ["https://t.me/shibatoken"],
        announcement_url: ["https://shiba-token.com/news"],
        twitter_screen_name: "shiba",
        facebook_username: "shibatoken",
        bitcointalk_thread_identifier: null,
        telegram_channel_identifier: "shibatoken",
        subreddit_url: "https://www.reddit.com/r/ShibaToken/",
        repos_url: {
            github: ["https://github.com/ShibaToken"],
            bitbucket: [],
        },
    },
    image: {
        thumb: "",
        small: "",
        large: "",
    },
    country_origin: "Japan",
    genesis_date: null,
    contract_address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
    sentiment_votes_up_percentage: 75,
    sentiment_votes_down_percentage: 25,
    watchlist_portfolio_users: 100000,
    market_cap_rank: 42,
    market_data: {
        current_price: {
            usd: 100.0,
            eur: 90.0,
            btc: 0.002
        },
        total_value_locked: null,
        mcap_to_tvl_ratio: null,
        fdv_to_tvl_ratio: null,
        roi: null,
        ath: {
            usd: 120.0,
            eur: 110.0,
            btc: 0.003
        },
        ath_change_percentage: {
            usd: 10.0,
            eur: 9.0,
            btc: 5.0
        },
        ath_date: {
            usd: new Date('2022-01-31T12:00:00Z'),
            eur: new Date('2022-01-31T12:00:00Z'),
            btc: new Date('2022-01-31T12:00:00Z')
        },
        atl: {
            usd: 80.0,
        },
        atl_change_percentage: {
            usd: -5.0,
        },
        atl_date: {
            usd: new Date('2022-01-30T12:00:00Z'),
        },
        market_cap: {
            usd: 1100000000,
            eur: 950000000,
            btc: 20000
        },
        market_cap_rank: 1,
        fully_diluted_valuation: {
            usd: 1200000000,
            eur: 1000000000,
            btc: 25000
        },
        market_cap_fdv_ratio: 0.9,
        total_volume: {
            usd: 50000000,
            eur: 45000000,
            btc: 1000
        },
        high_24h: {
            usd: 105.0,
            eur: 90.0,
            btc: 0.0022
        },
        low_24h: {
            usd: 95.0,
            eur: 80.0,
            btc: 0.0018
        },
        price_change_24h: 5.0,
        price_change_percentage_24h: 5.0,
        price_change_percentage_7d: 10.0,
        price_change_percentage_14d: 15.0,
        price_change_percentage_30d: 20.0,
        price_change_percentage_60d: 25.0,
        price_change_percentage_200d: 30.0,
        price_change_percentage_1y: 35.0,
        market_cap_change_24h: 10000000,
        market_cap_change_percentage_24h: 1.0,
        price_change_24h_in_currency: {
            usd: 5.0,
            eur: 4.0,
            btc: 0.0001
        },
        price_change_percentage_1h_in_currency: {
            usd: 1.0,
            eur: 0.8,
            btc: 0.00002
        },
        price_change_percentage_24h_in_currency: {
            usd: 5.0,
            eur: 4.0,
            btc: 0.0001
        },
        price_change_percentage_7d_in_currency: {
            usd: 10.0,
            eur: 8.0,
            btc: 0.0002
        },
        price_change_percentage_14d_in_currency: {
            usd: 15.0,
            eur: 12.0,
            btc: 0.0003
        },
        price_change_percentage_30d_in_currency: {
            usd: 20.0,
            eur: 16.0,
            btc: 0.0004
        },
        price_change_percentage_60d_in_currency: {
            usd: 25.0,
            eur: 20.0,
            btc: 0.0005
        },
        price_change_percentage_200d_in_currency: {
            usd: 30.0,
            eur: 25.0,
            btc: 0.0006
        },
        price_change_percentage_1y_in_currency: {
            usd: 35.0,
            eur: 30.0,
            btc: 0.0007
        },
        market_cap_change_24h_in_currency: {
            usd: 10000000,
            eur: 9000000,
            btc: 200
        },
        market_cap_change_percentage_24h_in_currency: {
            usd: 1.0,
            eur: 0.9,
            btc: 0.01
        },
        total_supply: 1000000000,
        max_supply: 5000,
        circulating_supply: 500000000,
        last_updated: new Date(),
    },
    community_data: {
        facebook_likes: null,
        twitter_followers: 500000,
        reddit_average_posts_48h: 50,
        reddit_average_comments_48h: 100,
        reddit_subscribers: 200000,
        reddit_accounts_active_48h: 30000,
        telegram_channel_user_count: 150000,
    },
    status_updates: [],
    last_updated: new Date(),
    tickers: [
        {
            base: "SHIB",
            target: "USDT",
            market: {
                name: "Binance",
                identifier: "binance",
                has_trading_incentive: true,
            },
            last: 0.00001,
            volume: 1000000,
            converted_last: {
                USDT: 0.00001,
            },
            converted_volume: {
                USDT: 10,
            },
            trust_score: "green",
            bid_ask_spread_percentage: 0.1,
            timestamp: new Date(),
            last_traded_at: new Date(),
            last_fetch_at: new Date(),
            is_anomaly: false,
            is_stale: false,
            trade_url: "https://www.binance.com/en/trade/SHIB_USDT",
            token_info_url: "https://coinmarketcap.com/currencies/shiba-inu/",
            coin_id: ID.ShibaInu,
            target_coin_id: "tether",
        },
    ],
};

export type isProgressData = [
    [string, string],
    [string, string],
    [string, number],
]

export const dummyData: isProgressData = [
    ["First", "Value"],
    ["Second", "Another Value"],
    ["Third", 42],
  ];