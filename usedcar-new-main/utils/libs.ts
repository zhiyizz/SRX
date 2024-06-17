
import { combineUrl,getUrlParams } from './helper'
import { PageWithSeriesData, SeriesCategory, SeriesObject } from './types/series'

type WrapperResponse = {
  code: number
  message: string
}

type SeriesObjectWrapper = WrapperResponse & {
  result: SeriesObject[]
}

type SeriesCategoryWrapper = WrapperResponse & {
  result: SeriesCategory[]
}

export async function getSeries(): Promise<PageWithSeriesData> {
  const preview = getUrlParams().preview ;
  const series = await fetch(preview ? combineUrl(process.env.NEXT_PUBLIC_PREVIEW_API, '/seriesobject') : combineUrl(process.env.NEXT_PUBLIC_STATIC_HOST, '/resource/vehicleSeries.json'))
  const category = await fetch(preview ? combineUrl(process.env.NEXT_PUBLIC_PREVIEW_API, '/seriescategorylist') : combineUrl(process.env.NEXT_PUBLIC_STATIC_HOST, '/resource/vehicleSeriesCategory.json'))

  return new Promise((resolove, reject) => {
    Promise.all<[Promise<SeriesObject[] | SeriesObjectWrapper>, Promise<SeriesCategory[] | SeriesCategoryWrapper>]>([series.json(), category.json()]).then((values) => {
      if (values) {
        const [resSeries, resCategory] = values

        let series: SeriesObject[] = []
        let category: SeriesCategory[] = []
        if (Array.isArray(resSeries) && Array.isArray(resCategory)) {
          series = resSeries
          category = resCategory
        } else if (!Array.isArray(resSeries) && !Array.isArray(resCategory)) {
          if (resSeries.code == 1000 && resCategory.code == 1000) {
            series = resSeries.result
            category = resCategory.result
          }
        }

        const order = series.filter(item => (item.carID || item.carId) && !item.flags?.mock).map(item => item.code)
        const uniqueOrder = new Set(order)
        resolove({
          series,
          category,
          seriesOrder: Array.from(uniqueOrder),
        })
      }
    }, reject)

  
  })

}
