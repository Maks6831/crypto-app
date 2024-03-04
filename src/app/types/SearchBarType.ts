export type SearchBarProps = {
    isSearch: boolean; 
} & ({
    isPortfolio: true;
    liftStateUp : Function;
    modalCloseChecker: boolean;
}|{
    isPortfolio: false
    defaultValue: string;
})

