export type SearchBarProps = {
    isSearch: boolean; 
} & ({
    isPortfolio: true;
    liftStateUp : Function;
    modalCloseChecker: boolean;
    setSearchState: Function;
    saveAsset: Function;
}|{
    isPortfolio: false
    defaultValue: string;
})

