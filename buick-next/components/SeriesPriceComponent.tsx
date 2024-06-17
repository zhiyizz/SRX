import type { Key } from "react"
import { formatPrice } from "@utils/helper"
import SeriesPrice, { type ISeriesPrice } from "@utils/SeriesPrice"

function priceElement(price: ISeriesPrice, className?: string, plain?: boolean, key?: Key) {
  const priceStr = formatPrice(price)
  if (price.display === false) {
    return null
  } else if (priceStr) {
    return <span className={className} key={key}>{price.label} {plain ? '&yen;' : <sup>&yen;</sup>}{priceStr}{price.start ? ' 起' : null}</span>
  } else if (price.label) {
    return <span className={className}>{price.label}</span>
  }
  return null
}

export default function SeriesPriceComponent({ price, className, plain = false,gmac }: {
  price?: string | number | ISeriesPrice | ISeriesPrice[]
  className?: string
  plain?: boolean,
  gmac?:boolean
}) {
  if (!price) {
    return null
  }
  if (typeof price === 'string') {
    return <span className={className}>{price}</span>
  }
  if (typeof price !== 'number') {
    if (Array.isArray(price)) {
      if (price.length > 1) {
        return (
          <>
            {price.map((p, idx) => {
              const priceObj = new SeriesPrice(p)
              return priceElement(priceObj, className, plain, idx)
            })}
          </>
        )
      } else if (price.length === 1) {
        const priceObj = new SeriesPrice(price[0])
        return priceElement(priceObj, className, plain)
      }
      return null
    } else {
      const priceObj = new SeriesPrice(price)
      return priceElement(priceObj, className, plain)
    }
  } else {
    const priceStr = formatPrice(price)
    if (priceStr) {
      return <span className={className}>{gmac?'':'官方指导价'} {plain ? '&yen;' : <sup>&yen;</sup>}{priceStr} 起</span>
    }
    return null
  }
}
