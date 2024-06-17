'use client'

import useSWR from 'swr'

import type { DealerObject } from './dealer'
import { combineUrl } from './helper'
import type { LoanCarInfo } from '~types/gmac'

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

export type HotlineObject = {
  citys: {
    cityId: string
    cityName: string
    towns: {
      townId: string
      townName: string
      dealers: DealerObject[]
    }[]
  }[]
  provinceId: string
  provinceName: string
}

export function useOnlineDealer() {
  const { data, error } = useSWR<HotlineObject[], Error>(combineUrl(process.env.NEXT_PUBLIC_STATIC_HOST, '/resource/onlinedealer.json'), fetcher, { revalidateOnFocus: false })

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useServiceData(auto = false) {
  const { data, error } = useSWR<DealerObject[], Error>(auto && combineUrl(process.env.NEXT_PUBLIC_STATIC_HOST, '/resource/service.json'), fetcher, { revalidateOnFocus: false })

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

/**
 * 车型配置数据结构。
 */
export type SpecsDataType = {
  /**
   * 车型名列表。
   */
  name: {
    /**
     * 车系。
     */
    car: string
    /**
     * 车系英文名。
     */
    car_en: string
    /**
     * 车型。
     */
    model: string
    /**
     * 车型英文名。
     */
    model_en: string
    /**
     * 官方价格。
     */
    price: string | number | null,
    /**
     * NEDC纯电行驶里程。
     */
    NEDC?:string,
    /**
     * CLTC纯电行驶里程。
     */
    CLTC?:string,
    /**
     * 补贴后售价。
     */
    discount?:string,
  }[]
  /**
   * 配置信息。
   */
  spec: {
    /**
     * 配置分类。
     */
    catalog: string
    /**
     * 配置详情。
     */
    content: {
      /**
       * 配置项目。
       */
      k: string
      /**
       * 是否合并单元格。
       */
      m?: boolean
      /**
       * 配置数据。
       */
      v: string[]
    }[]
  }[]
}

export function useSpecsData(code?: string, preview = false) {
  const { data, error } = useSWR<SpecsDataType>(code && (preview ? `/webapi/seriesspecifications?code=${code}` : combineUrl(process.env.NEXT_PUBLIC_STATIC_HOST, `/resource/specifications/${code}.json`)), fetcher, { revalidateOnFocus: false })

  return {
    data,
    isLoading: !error && !data,
    error,
  }
}

type LoanCarRes = {
  ErrMsg: string
  IsSuccess: string | boolean
  RecCount: string | number
  data: LoanCarInfo[]
}

type BasePeriod = {
  period: number
}

type LoanTypeCondiType = {
  max_downpayment_rate?: number
  max_loan_amount?: number
  min_downpayment_rate: number
  min_loan_amount: number
}

type LoanTypeCondi = (LoanTypeCondiType & {
  loan_type_id: string | number
}) | {
  loan_type_id: string | number
  loan_list: LoanTypeCondiType[]
}

type LoanInfo = {
  discount_info?: string
  discount_program_id: string
  is_allow_add: string
  is_allow_discount: string
  max_loan_amount?: number
  max_msrp_rate: string
  min_loan_amount: string
  min_tp_price?: string
}

type LoanType = {
  loan_list: (LoanInfo & {
    downpayment_rate_list: {
      downpayment_amount: number
      downpayment_rate: number
      loan_amount: number
      period_list: {
        interest_amount: number
        interest_rate: number
        month_pay: number
        period: number
        show_interest_rate: boolean
      }[]
    }[]
    is_new_type: string
    loan_name: string
    max_downpayment_rate: number
    min_downpayment_rate: string
  })[]
  loan_type_id: '5'
} | (LoanInfo & {
  loan_list: {
    discount_info?: string
    downpayment_rate_list: {
      downpayment_amount: number
      downpayment_rate: number
      loan_amount: number
      period_list: {
        interest_amount: number
        interest_rate: number
        month_pay_list: {
          month_pay: number
          period: string
          tail_money: number
          tail_money_rate: number
        }[]
        period: number
        show_interest_rate: boolean
      }[]
    }[]
    loan_name: string
  }[]
  loan_type_id: '6'
}) | (LoanInfo & {
  discount_info: string
  downpayment_rate: number
  period: number
  discount_program_id: string
  downpayment_amount: number
  loan_amount: number
  month_pay: number
  interest_rate: number
  interest_amount: number
  final_amount: number
  show_interest_rate: number
  loan_type_id: '2'
})

type LoanContentRes = {
  ErrMsg: string
  IsSuccess: string | boolean
  base_period_list: BasePeriod[]
  last_update_time: string
  loan_type_condition_list: LoanTypeCondi[]
  loan_type_list: LoanType[]
}
type GmfData = {
  vehicleSeries:string
  vehicleModels:{
    name:string
    data:{
      /**
       * 首付比例
       */
      downPaymentRatio:number
      /**
       * 首付金额
       */
      downPayment:number
      /**
       * 车辆价格
       */
      price:number
      items:{ 
        /**
         * 期数
         */
        periods:number
        /**
         * 月供 
         */  
        monthly: number
        /**
         * 尾款
         */
        tail:number
      }[]
    }[]
  }[]
}[]

/**
 * 获取金融车贷数据。
 * @param car 车型名。
 * @param id 车型ID。
 * @param price 计算金额。
 * @returns 金融车贷数据。
 */
export function useGmacLoan(car?: string, id?: string, price?: string) {
  const { data: list } = useSWR<LoanCarRes>(combineUrl(process.env.NEXT_PUBLIC_STATIC_HOST, '/resource/loan.json'), fetcher, { revalidateOnFocus: false })
  const { data: gmf } = useSWR<GmfData>(combineUrl(process.env.NEXT_PUBLIC_STATIC_HOST, '/resource/GMF.json'), fetcher, { revalidateOnFocus: false })

  let models: LoanCarInfo[] = null!
  if (list?.IsSuccess) {
    if (car) {
      const reg = new RegExp(`${car.replace(/\s+/g, '')}$`, 'i')
      models = list!.data.filter(item => reg.test(item.parent_car_desc.replace(/\s+/g, '')))
    } else {
      models = list!.data
    }
  }

  const { data: content, error } = useSWR<LoanContentRes>(() => {
    if (models) {
      let idx = id ? models.findIndex(item => item.car_id === id) : 0
      if (!~idx) {
        idx = 0
      }
      const car_id = id || models[0].car_id
      const p = price || models[idx].guide_price.replace(/\.[^\.]+$/, '')
      return combineUrl(process.env.NEXT_PUBLIC_API_PREFIX, '/Financial/LoanContent', car_id, p)
    }
  }, fetcher, { revalidateOnFocus: false })

  if (models) {
    return {
      list,
      gmf,
      content,
      isLoading: !error && !content,
      error,
    }
  }

  return {
    isLoading: !error && !content,
    error,
  }
}
