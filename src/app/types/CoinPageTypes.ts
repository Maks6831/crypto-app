export interface CoinPageType {
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
    max_supply:                                   null;
    circulating_supply:                           number;
    last_updated:                                 Date;
}

export interface Platforms {
    ethereum: string;
}
