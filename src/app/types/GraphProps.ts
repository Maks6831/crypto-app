export type GraphProps = {
    days : string
    isCoinPage : boolean
  } & ({
    isLine: true
    prices : number[]
    labels : number[]
    handleHover : Function
  }|{
    isLine: false
    labelsTwo: number[]
    market_caps: number[]
  })