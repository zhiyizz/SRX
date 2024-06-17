
import type { ISeriesPrice } from '../SeriesPrice'

/**
 * 车型数据对象。
 */
export type SeriesObject = {
  /**
   * 车型ID。
   */
  carId?: string | number
  /**
   * 车型ID。
   */
  carID?: string | number
  /**
   * 车型名称。
   */
  name: string
  /**
   * 显示名称（默认： `name`）。
   */
  displayName?: string
  /**
   * 车型代码。
   */
  code: string
  /**
   * 车型图片URL。
   */
  pic: string
  /**
   * 车型分类。
   */
  category: string
  /**
   * 车型价格。
   */
  price?: string | number | ISeriesPrice | ISeriesPrice[]
  /**
   * 车型手册。
   */
  brochure?: string
  /**
   * 别克购车链接。
   */
  ebuick?: string
  /**
   * 车型页URL（未指定则使用 `code`）。
   */
  url?: string
  /**
   * 车型功能开关。
   */
  flags?: SeriesFlags
  /**
   * 监测代码。
   */
  tracking: string | TrackingPrefix
}

/**
 * 控制车型对应的各个功能模块的开关。
 */
export type SeriesFlags = {
  /**
   * 主导航。
   */
  nav?: boolean
  /**
   * 外观360。
   */
  exterior?: boolean
  /**
   * 内饰360。
   */
  interior?: boolean
  /**
   * 试驾。
   */
  testdrive?: boolean
  /**
   * 车型配置。
   */
  spec?: boolean
  /**
   * 车贷套餐。
   */
  gmac?: boolean
  /**
   * 车贷申请。
   */
  apply?: boolean
   /**
   * 车型对比。
   */
  compare?: boolean
  /**
   * 虚拟车型（不生成车型页，特殊情况下使用）。
   */
  mock?: boolean
}

/**
 * 表示监测代码通用前缀。
 */
export type TrackingPrefix = {
  /**
   * 秒针监测。
   */
  mz: string
  /**
   * Prefix for _Google Analytics_.
   */
  ga?: string
}

/**
 * 车型分类。
 */
export type SeriesCategory = {
  /**
   * 分类名称。
   */
  name: string
  /**
   * 分类简介。
   */
  intro?: {
    title: string
    content: string
    link?: string
  }
  /**
   * 显示名称（未指定则使用 `name`）。
   */
  displayName?: string
  /**
   * 分类下包含的车型 `code`。
   */
  series?: string[]
}





/**
 * 车型精彩赏析。
 */
export type SeriesGallery = {
  /**
   * 资源类型（默认：`image`）。
   */
  type?: 'video' | 'image'
  /**
   * 资源URL。
   */
  url: string
  /**
   * 缩略图URL。
   */
  thumbnail?: string
  /**
   * 视频静帧。
   */
  poster?: string
  /**
   * 缩略图宽度（单位：*px*）。
   */
  width?: number
  /**
   * 缩略图高度（单位：*px*）。
   */
  height?: number
  /**
   * 资源标题。
   */
  title?: string
}

/**
 * 车型数据作为属性的页面。
 */
export type PageWithSeriesData = {
  /**
   * 车型数据。
   */
  series: SeriesObject[]
  /**
   * 车型列表显示顺序。
   */
  seriesOrder?: string[]
  /**
   * 车型分类。
   */
  category?: SeriesCategory[]
  /**
   * PV名称。
   */
  pvName?: string
}

/**
 * 表示车型基本属性。
 */
export type SeriesProperty = {
  /**
   * 车型ID。
   */
  carID?: string | number
  /**
   * 车型ID。
   */
  carId?: string | number
  /**
   * 车型名称。
   */
  name: string
  /**
   * 显示名称（默认： `name`）。
   */
  displayName?: string
  /**
   * 车型代码。
   */
  code: string
  /**
   * 车型功能开关。
   */
  flags?: {
    testdrive?: boolean
    xnyDealer?: boolean
  }
}

export function isSeriesProperty(value: any): value is SeriesProperty {
  return value && ('carID' in value || 'carId' in value) && ('code' in value)
}

export type KvInfoType = {
  /**
   * 图片URL。
   */
  url?: string
  /**
   * 图片宽度。
   */
  width?: number
  /**
   * 图片高度。
   */
  height?: number
  /**
   * 信息标题。
   */
  title?: string
  /**
   * 信息内容。
   */
  content?: string
  /**
   * 文字颜色主题（默认：`dark`）。
   */
  theme?: 'dark' | 'light'
  /**
   * 显示价格。
   */
  price?: boolean
}



