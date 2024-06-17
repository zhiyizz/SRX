import type { DealerProvince, DealerType } from '~types/dealer'

/**
 * 接口返回的经销商数据结构（包含：经销商、特约维修站、热线）。
 */
export type DealerObject = {
  address: string
  cdate?: number
  cityId: number | string
  cityName: string
  claimcode?: string
  code?: string
  dealerCode: string
  // 经销商热线
  dealerExtensionNumber?: string
  dealerName: string
  // 经销商热线
  dealerTelephone?: string
  districtId: number | string
  districtName: string
  id?: number | string
  isDelete?: boolean
  isFinal?: boolean
  // 特约维修站
  // isopen?: number
  lat: string | number
  lng: string | number
  // macId: number
  // macName: string
  provinceId: number | string
  provinceName: string
  // raingcount: number
  referred: string
  // regionalId: number
  // regionalName: string
  tel: string
  // total: number
  udate?: number
  // url: string
  velite?: number
  // verson: number
}

type ObjectWithId = {
  id: number | string
}

function sortById(a: ObjectWithId, b: ObjectWithId) {
  return Number(a.id) - Number(b.id)
}

/**
 * 处理经销商数据。
 * @param data 待处理的经销商列表。
 * @param xnyData 待处理的新能源经销商列表。
 * @param isService 是否为特约维修站。
 * @param isHotline 是否为热线。
 * @returns 标准化经销商数据结构。
 */
export function processDealerData(data: DealerObject[], isService?: boolean, isHotline?: boolean): DealerProvince[]
/**
 * 处理经销商数据（合并模式）。
 * @param general 待处理的经销商列表。
 * @param service 待处理的维修站列表。
 * @param ev 待处理的新能源经销商列表。
 * @param force 强制插入数据。
 */
export function processDealerData(general: DealerObject[], service: DealerObject[], ev: DealerObject[], force?: boolean): DealerProvince[]

export function processDealerData(data: DealerObject[], isService: DealerObject[] | boolean = false, isHotline: DealerObject[] | boolean = false, force = false) {
  if (!data) {
    return []
  }
  const newData: DealerProvince[] = []
  // let csv = []
  const mergeMode = Array.isArray(isService) || Array.isArray(isHotline)
  const process = (obj: DealerObject, tag?: 'service' | 'ev') => {
    // if (!mergeMode && !isHotline) {
    //   if (isService && (!obj.lat || !obj.lng)) {
    //     return
    //   }
    // }

    let province = newData.find(item => obj.provinceId == item.id);//BUICK.searchFrom(newData, obj.provinceId, "id")
    if (!province) {
      province = {
        id: obj.provinceId,
        name: obj.provinceName,
        city: [],
        dealer: [],
        index: newData.length,
      }
      newData.push(province)
    }
    let city = province.city.find(item => obj.cityId == item.id);//BUICK.searchFrom(province.city, obj.cityId, "id");
    if (!city) {
      city = {
        id: obj.cityId,
        name: obj.cityName,
        district: [],
        index: province.city.length,
      };
      province.city.push(city)
    }
    let district = city.district.find(item => obj.districtId == item.id);//BUICK.searchFrom(city.district, obj.districtId, "id");
    if (!district) {
      district = {
        id: obj.districtId,
        name: obj.districtName,
        index: city.district.length,
      }
      city.district.push(district)
    }
    let dealer: DealerType | undefined = force ? undefined : province.dealer.find(item => obj.dealerCode === item.code || obj.dealerName === item.name)
    if (!dealer) {
      if (Array.isArray(isHotline) || (!Array.isArray(isHotline) && !isHotline)) {
        // 过滤掉同时没有地址和电话的数据
        if (!obj.address && !obj.tel) {
          return
        }
      }
      dealer = {
        city: obj.cityId,
        cityName: obj.cityName,
        district: obj.districtId,
        address: obj.address,
        code: obj.dealerCode,
        name: obj.dealerName,
        lat: obj.lat,
        lng: obj.lng,
        referred: obj.referred,
        tel: obj.tel,
      }
      province.dealer.push(dealer)
    }

    if (mergeMode) {
      switch(tag) {
        case 'ev':
          dealer.ev = true
          break
        case 'service':
          dealer.service = true
          dealer.id = obj.id
          if (dealer.tel !== obj.tel) {
            dealer.serviceTel = obj.tel
          }
          break
        default:
          dealer.general = true
          break
      }
    } else {
      if (isHotline && obj.dealerTelephone) {
        delete dealer.referred
        dealer.tel = obj.dealerTelephone
        dealer.ext = obj.dealerExtensionNumber
      }
      if (!isService) {
        dealer.id = obj.id
      }
    }
  }

  data.forEach(obj => process(obj))
  if (mergeMode) {
    if (Array.isArray(isService)) {
      isService.forEach(obj => process(obj, 'service'))
    }
    if (Array.isArray(isHotline)) {
      isHotline.forEach(obj => process(obj, 'ev'))
    }
  }
  newData.sort(sortById).forEach((p, idx) => {
    p.index = idx
    p.city.sort(sortById).forEach((c, idx) => {
      c.index = idx
      c.district.sort(sortById).forEach((d, idx) => {
        d.index = idx
      })
    })
  })
  return newData
}

function toRad(degree: number) {
  return (degree * Math.PI) / 180
}

function isPoint(val: unknown): val is BMapGL.Point {
  const isObject = val && typeof val === 'object'

  if (isObject) {
    return 'lng' in val && 'lat' in val
  }
  return false
}

export function distanceBetweenPoint(lng1: BMapGL.Point, lat1: BMapGL.Point): number
export function distanceBetweenPoint(lng1: number, lat1: number, lng2: number, lat2: number): number

export function distanceBetweenPoint(lng1: number | BMapGL.Point, lat1: number | BMapGL.Point, lng2?: number, lat2?: number) {
  let _lng1 = 0
  let _lat1 = 0
  switch (arguments.length) {
    case 2:
      if (isPoint(lng1) && isPoint(lat1)) {
        lng2 = lat1.lng || 0
        lat2 = lat1.lat || 0
        _lat1 = lng1.lat || 0
        _lng1 = lng1.lng || 0
      } else {
        return NaN
      }
      break
    case 3:
      if (isPoint(lng1) && !isPoint(lat1)) {
        lat2 = lng2 || 0
        lng2 = lat1 || 0
        _lat1 = lng1.lat || 0
        _lng1 = lng1.lng || 0
      } else {
        return NaN
      }
      break
    case 4:
      break
    default:
      return NaN
  }
  if (!_lng1 || !_lat1 || !lng2 || !lat2) {
    return NaN
  }
  const R = 6371
  // Radius of the earth in km
  const dLat = toRad(lat2 - _lat1)
  // Javascript functions in radians
  const dLon = toRad(lng2 - _lng1)
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(_lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c
  // Distance in km
  return Math.round(d * 10) / 10
}
