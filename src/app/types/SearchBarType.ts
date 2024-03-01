export type SearchBarProps = {
    isSearch: boolean; 
} & ({
    isPortfolio: true;
    liftStateUp : Function;
}|{
    isPortfolio: false
    defaultValue: string;
})

