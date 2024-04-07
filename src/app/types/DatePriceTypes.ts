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
    error?:                ErrorInterface
}

export interface ErrorInterface {
    status: {
      timestamp: string;
      error_code: number;
      error_message: string;
    };
  }

export interface DatePriceObj extends DatePriceType {
    date: string;
    amount: number;
    id: string;
    uid: string;
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
    large: string;
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

export const minimalDatePriceObj: DatePriceObj = {
    id: "",
    symbol: "",
    name: "",
    localization: {
        en: "",
        de: "",
        es: "",
        fr: "",
        it: "",
        pl: "",
        ro: "",
        hu: "",
        nl: "",
        pt: "",
        sv: "",
        vi: "",
        tr: "",
        ru: "",
        ja: "",
        zh: "",
        "zh-tw": "",
        ko: "",
        ar: "",
        th: "",
        id: "",
        cs: "",
        da: "",
        el: "",
        hi: "",
        no: "",
        sk: "",
        uk: "",
        he: "",
        fi: "",
        bg: "",
        hr: "",
        lt: "",
        sl: "",
    },
    image: {
        thumb: "",
        small: "",
        large:'',
    },
    market_data: {
        current_price: {
            "usd":0.2,
            "eur":9.2,
            "gbp":9.0
        },
        market_cap: {},
        total_volume: {},
    },
    community_data: {
        facebook_likes: null,
        twitter_followers: 0,
        reddit_average_posts_48h: 0,
        reddit_average_comments_48h: 0,
        reddit_subscribers: 0,
        reddit_accounts_active_48h: "",
    },
    developer_data: {
        forks: null,
        stars: null,
        subscribers: null,
        total_issues: null,
        closed_issues: null,
        pull_requests_merged: null,
        pull_request_contributors: null,
        code_additions_deletions_4_weeks: {
            additions: null,
            deletions: null,
        },
        commit_count_4_weeks: null,
    },
    public_interest_stats: {
        alexa_rank: null,
        bing_matches: null,
    },
    date: "",
    amount: 0,
    uid: '202020-3'
};
