import useSWR from 'swr'

const fetcher = (input: string, data?: Record<string, string>) => {
    const url = /^https?:/.test(input) ? input : `${process.env.NEXT_PUBLIC_API_PREFIX || ''}/${input.replace(/^\.*\//, '')}`
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



export const useBuyPlan = () => {
  /*获取预计购车时间*/
 
  const { data, error } = useSWR('/Financial/GmacBuyPlan', fetcher, { 
    revalidateOnFocus: false,
  })

  return {
    data,
    isLoading: !error && !data,
    error,
  } 
}

export const useCarId = () => {
    /*获取车型ID*/
    const { data, error } = useSWR('/Financial/GmacCar?brandId=4', fetcher, { 
      revalidateOnFocus: false,
    })
  
    return {
      data,
      isLoading: !error && !data,
      error,
    } 
}

export const  useProvince = (brandid?: string,carid?: string) => {
  /*获取车型ID*/
  const {data,error} = useSWR(() => {
    const query = new URLSearchParams({
      brandid:brandid!,
      carid:carid!,
    });

  return  `/Financial/GmacProvince?${query}`
}, fetcher, { revalidateOnFocus: false })

  return {
    data,
    isLoading: !error && !data,
    error,
  } 
}

export const  useCity = (brandid?: string,carid?: string,provinceCode?:string) => {
  /*获取车型ID*/
  const {data,error} = useSWR(() => {
    const query = new URLSearchParams({
      brandid:brandid!,
      carid:carid!,
      provinceid:provinceCode!
    });

    return `/Financial/GmacCity?${query}`
  }, fetcher, { revalidateOnFocus: false })

  return {
    data,
    isLoading: !error && !data,
    error,
  } 
}


// export  const useFinanceLoan = (model:string,carid?:string | undefined,provinceid?:string | undefined) => {
//   const {data,error} = useSWR(() => {
//       const query = new URLSearchParams({
//         op:model,
//         carid:carid!,
//         provinceid:provinceid!
//       });

//     return `https://www.buick.com.cn/gmac/applydata.aspx?${query}`
//   }, fetcher, { revalidateOnFocus: false })

//     return {
//       data,
//       isLoading: !error,
//       error,
//     }
// }
