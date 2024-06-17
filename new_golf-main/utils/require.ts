import useSWR from 'swr';
import { combineUrl } from './helper';
import { DealerObject } from './dealer';
import { PageWithSeriesData, SeriesCategory, SeriesObject } from './types/series'

class DataFetchError extends Error {

  status?: number
  data?: string

  constructor(message?: string) {
    super(message)
    this.name = 'DataFetchError'
  }
}

const fetcher = async (input: string, data?: Record<string, string>) => {

  const url = input // /^https?:/.test(input) ? input : `${process.env.NEXT_PUBLIC_API_PREFIX || ''}/${input.replace(/^\.*\//, '')}`

  let init: RequestInit
  if (data) {
    init = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(data)
    }
  }

  const res = await fetch(url, init!)

  if (!res.ok) {
    const error = new DataFetchError('数据获取失败。')
    error.data = await res.text()
    error.status = res.status
    throw error
  }

  return res.json()
}


export function useDealerData() {
  const { data, error } = useSWR<DealerObject[], Error>(combineUrl(process.env.NEXT_PUBLIC_STATIC_HOST, '/resource/dealer.json'), fetcher, { revalidateOnFocus: false })

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}


export function useDealerEv(auto = false) {
  const { data, error } = useSWR<DealerObject[], Error>(auto && combineUrl(process.env.NEXT_PUBLIC_STATIC_HOST, '/resource/dealer_xny.json'), fetcher, { revalidateOnFocus: false })

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
export  function useSeries(){
  const {data,error} =  useSWR<SeriesObject[]>( combineUrl(process.env.NEXT_PUBLIC_STATIC_HOST, '/resource/vehicleSeries.json'), fetcher, { revalidateOnFocus: false })


  // const order = data?.filter(item => (item.carID || item.carId) && !item.flags?.mock).map(item => item.code)
  // const uniqueOrder = new Set(order)
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
  }
   

