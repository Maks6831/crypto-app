export type GraphProps = {
    days : string
  } & ({
    isLine: true
    prices : number[]
    labels : number[]
  }|{
    isLine: false
    labelsTwo: number[]
    market_caps: number[]
  })