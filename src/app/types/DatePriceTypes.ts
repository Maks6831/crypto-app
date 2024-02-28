export interface DatePriceType {
    id:                    string;
    symbol:                string;
    name:                  string;
    localization:          Localization;
    image:                 Image;
    market_data:           MarketData;
    community_data:        CommunityData;
    developer_data:        DeveloperData;
    public_interest_stats: PublicInterestStats;
}

export interface DatePriceObj extends DatePriceType {
    date: string;
    amount: number;
    id: string    
}

export interface CommunityData {
    facebook_likes:              null;
    twitter_followers:           number;
    reddit_average_posts_48h:    number;
    reddit_average_comments_48h: number;
    reddit_subscribers:          number;
    reddit_accounts_active_48h:  string;
}

export interface DeveloperData {
    forks:                            null;
    stars:                            null;
    subscribers:                      null;
    total_issues:                     null;
    closed_issues:                    null;
    pull_requests_merged:             null;
    pull_request_contributors:        null;
    code_additions_deletions_4_weeks: CodeAdditionsDeletions4_Weeks;
    commit_count_4_weeks:             null;
}

export interface CodeAdditionsDeletions4_Weeks {
    additions: null;
    deletions: null;
}

export interface Image {
    thumb: string;
    small: string;
}

export interface Localization {
    en:      string;
    de:      string;
    es:      string;
    fr:      string;
    it:      string;
    pl:      string;
    ro:      string;
    hu:      string;
    nl:      string;
    pt:      string;
    sv:      string;
    vi:      string;
    tr:      string;
    ru:      string;
    ja:      string;
    zh:      string;
    "zh-tw": string;
    ko:      string;
    ar:      string;
    th:      string;
    id:      string;
    cs:      string;
    da:      string;
    el:      string;
    hi:      string;
    no:      string;
    sk:      string;
    uk:      string;
    he:      string;
    fi:      string;
    bg:      string;
    hr:      string;
    lt:      string;
    sl:      string;
}

export interface MarketData {
    current_price: { [key: string]: number };
    market_cap:    { [key: string]: number };
    total_volume:  { [key: string]: number };
}

export interface PublicInterestStats {
    alexa_rank:   null;
    bing_matches: null;
}
