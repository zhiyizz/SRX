import useSWR from 'swr';
import { combineUrl } from './helper'
import { PageWithSeriesData, SeriesObject } from './types/series';
import { DealerObject } from './dealer'





type WrapperResponse = {
  code: number
  message: string
}
type SeriesObjectWrapper = WrapperResponse & {
  result: SeriesObject[]
}

const fetcher = (input: string, data?: Record<string, string>) => {
    const url = /^https?:/.test(input) ? input : `${"https://static.buick.com.cn" || ''}/${input.replace(/^\.*\//, '')}`
    let init: RequestInit;
    if (data) {
      init = {
        method: 'GET',
        // mode:"cors",
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data)
      }
    }
    return fetch(url, init!).then((res) => res.json())
}

  export async function seriesData(): Promise<PageWithSeriesData> {
    const hostName = window.location.hostname;
    let seriesUrl:string;
    let test:boolean;
    if (hostName === "localhost" || hostName === "127.0.0.1" || hostName.indexOf("172.16.") === 0 || hostName === "webtest.buick.com.cn") {
      seriesUrl = "https://webtest.buick.com.cn/webapi";
      test = true;
    } else {
      seriesUrl = "https://static.buick.com.cn";
      test = false;
    }
    const series = await fetch(test ? combineUrl(seriesUrl, '/seriesobject') : combineUrl(seriesUrl, '/resource/vehicleSeries.json'))
  //  const category = await fetch(preview ? combineUrl(import.meta.env.VITE_PREVIEW_API, '/seriescategorylist') : combineUrl(import.meta.env.VITE_PUBLIC_API_PREFIX, '/resource/vehicleSeriesCategory.json'))
    return new Promise((resolove, reject) => {
      Promise.all<[Promise<SeriesObject[] | SeriesObjectWrapper>]>([series.json()]).then((values) => {
      
        if (values) {
          const [resSeries] = values
          
          let series: SeriesObject[] = []
        //  let category: SeriesCategory[] = []
          if (Array.isArray(resSeries) ) {
            series = resSeries.filter(item => (!item.flags?.mock  !== false ))
          //  category = resCategory
          } else if (!Array.isArray(resSeries)) {
            if (resSeries.code === 1000) {
              series = resSeries.result.filter(item => (!item.flags?.mock !== false ))
            //  category = resCategory.result
            }
          }
  
          const order = series.filter(item => (item.carID || item.carId) && !item.flags?.mock).map(item => item.code)
          const uniqueOrder = new Set(order)
          resolove({
            series,
           // category,
            seriesOrder: Array.from(uniqueOrder),
          })
        }
      }, reject)
  
      // https.get('https://www.buick.com.cn/api/series.json', res => {
      //   const { statusCode } = res
      //   let error
      //   if (statusCode !== 200) {
      //     error = new Error('request failed')
      //   }
  
      //   if (error) {
      //     res.resume()
      //     return
      //   }
  
      //   res.setEncoding('utf8')
      //   let rawData = ''
      //   res.on('data', chunk => { rawData += chunk })
      //   res.on('end', () => {
      //     try {
      //       const parsedData = JSON.parse(rawData)
      //       // console.log(parsedData)
      //       resolove(parsedData)
      //     } catch (ex) {
      //       console.error(ex)
      //       reject(ex)
      //     }
      //   }).on('error', e => {
      //     console.error(`Got error: ${e.message}`)
      //     reject(e)
      //   })
      // })
    })
    // const content = fs.readFileSync(path.join(process.cwd(), 'data/series.json'), 'utf8')
    // return JSON.parse(content)
  }

  // export  function useSeriesData(){
  //   /*获取车型列表*/
  //   const { data, error } = useSWR('https://static.buick.com.cn/resource/vehicleSeries.json', fetcher, { 
  //     revalidateOnFocus: false,
  //   })
  //   console.log(data);
  //   return {
  //     data,
  //     isLoading: !error && !data,
  //     error,
  //   } 
  // }

export const useDealerData = (xny?:boolean) => {
    /*获取经销商列表*/
    const { data, error }  = useSWR<DealerObject[], Error>('/resource/dealer.json', fetcher, { 
        revalidateOnFocus: false,
    })
  //   const {data:xnyData,error:xerror} =   useSWR<DealerObject[], Error>( xny?'/resource/dealer_xny.json':null, fetcher, { 
  //     revalidateOnFocus: false,
  // })
    
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useDealerEv(auto = false) {
  const { data, error } = useSWR<DealerObject[], Error>(auto && '/resource/dealer_xny.json', fetcher, { revalidateOnFocus: false })

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}




// export const useLocation = () => {
//     /*获取Ip地址*/
//     const { data, error } = useSWR('https://www.buick.com.cn/buickapi/officialsite/Ip/LocationNew', fetcher, { 
//         revalidateOnFocus: false,
//     })
//     return {
//         data,
//         isLoading: !error && !data,
//         error,
//     } 
// }
