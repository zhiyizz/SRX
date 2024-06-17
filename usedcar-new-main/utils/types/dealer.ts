/**
 * 可索引对象包含其索引值。
 */
type IndexedObject = {
  /**
   * 索引（从 `0` 开始）。
   */
  index?: number
}

/**
 * 经销商所在的地区。
 */
export type DealerRegion = IndexedObject & {
  id: number
  name: string
}

/**
 * 经销商所在的城市。
 */
export type DealerCity = DealerRegion & {
  /**
   * 城市中包含的辖区。
   */
  district: DealerRegion[]
}

/**
 * 表示经销商的数据对象。
 */
export type DealerType = IndexedObject & {
  address: string
  city: number | string
  cityName: string
  code: string
  district: number | string
  id?: string | number
  lat: string | number
  lng: string | number
  name: string
  referred?: string
  tel: string
  distance?: number
  ext?: string
  service?: boolean
  ev?: boolean
  general?: boolean,
  districtName?:string
}

export type DealerTypeSubmit = IndexedObject & {
  address: string
  cityId: number
  cityName: string
  dealerCode: string
  dealerName:string
  districtId:number
  districtName:string
  id:number
  lat: string | number
  lng: string | number
  macId:number
  macName:string
  provinceId:number
  provinceName:string
  referred:string
  regionalId:number
  regionalName:string
  tel:string
  url:string,
  verson:number | string
}
/**
 * 经销商所在的省份。
 */
export type DealerProvince = DealerRegion & {
  /**
   * 省份中包含的城市。
   */
  city: DealerCity[]
  /**
   * 省份中经销商列表。
   */
  dealer: DealerType[]
}
