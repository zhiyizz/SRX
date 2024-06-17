import { PromoIcons } from '@components/icons'

import type { ISeriesPrice } from '../SeriesPrice'

import { KvMediaType, KvSlide } from './slider'

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
 * 金融促销政策详情。
 */
type SeriesPromoDetail = {
  /**
   * 图标。
   */
  icon: PromoIcons
  /**
   * 政策标题。
   */
  title: string
  /**
   * 政策内容（换行用 `\n` 表示）。
   */
  content?: string
}

/**
 * 金融促销政策。
 */
export type SeriesPromo = {
  /**
   * 标题（默认：`别克倾情 负担清零`）。
   */
  title?: string
  /**
   * 副标题（显示于标题上方，默认：`金融政策`）。
   */
  subTitle?: string
  /**
   * 底部说明（换行用 `\n` 表示）。
   */
  remark?: string
  /**
   * 政策详情。
   */
  detail: SeriesPromoDetail[]
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

type SeriesExteriorProperties = {
  /**
   * 起始序列（默认：`1`）。
   */
  start?: number
  /**
   * 初始帧（默认：`start`）。
   */
  initial?: number
  /**
   * 总帧数（默认：`36`）。
   */
  count?: number
  /**
   * 帧高度。
   */
  height?: number
  /**
   * 帧宽度。
   */
  width?: number
  /**
   * 外观配色。
   */
 // colors: VehicleColor[]
  /**
   * 背景颜色匹配。
   */
  matchColor?: boolean
}

type SeriesExteriorBundle = {
  /**
   * iframe嵌套页面URL。
   */
  url: string
}

export function isSeriesExteriorProperties(val: any): val is SeriesExteriorProperties {
  return val && 'colors' in val
}

export function isSeriesExteriorBundle(val: any): val is SeriesExteriorBundle {
  return val && 'url' in val
}

export type SeriesViewerProperties = SeriesExteriorProperties | SeriesExteriorBundle

export type SeriesJson = {
  /**
   * 顶部轮播图。
   */
  kv: KvSlide[]
  /**
   * 车型信息（奖项、亮点等）。
   */
  info?: KvInfoType[]
  /**
   * FBI内容。
   */
 // features?: FeatureJson[]
  /**
   * 艾维亚FBI内容。
   */
  avenir?: {
    intro: KvMediaType[]
    maskColor:string
  //  features: AvenirJson[]
  }
  /**
   * 新能源FBI内容。
   */
  velite?: {
    //app: VeliteIbuickApp,
  //  features: VeliteJson[]
  }
  /**
   * 精彩赏析。
   */
  gallery?: SeriesGallery[]
  /**
   * 金融政策。
   */
  promo?: SeriesPromo
  /**
   * 车型配置。
   */
  specs?: {
    /**
     * 配置表切换标签。
     */
   // tabs?: SpecsTab[]
    /**
     * 配置表底部注释。
     */
    remark?: string
    /**
     * 配置表底部声明。
     */
    declaration?: string
  }
  
  /**
   * 试驾组件。
   */
  testdrive?: {
    theme?:string
  }
  /**
   * 360外观内饰。
   */
  show?: SeriesViewerProperties & {
    /**
     * 360内饰。
     */
    pano?: {
      /**
       * 内饰选择框。
       */
      selector?: {
        name: string
        value: string
        selected?: boolean
      }[]
      /**
       * 内饰切换。
       */
      tabs?: {
        code: string
        text: string
        /**
         * 右侧小字。
         */
        sub?: string
      }[]
      /**
       * 内饰视角。
       */
      view?: {
        code: string
        name: string
      }[]
      /**
       * 内饰颜色。
       */
     // colors?: VehicleColor[]
      /**
       * BOSE外挂包URL（将覆盖 `tabs` 配置）。
       */
      bose?: string
    }
  }
}

export type SeriesPageProperties = {
  code: string,
  name?:string,
  data: SeriesJson
  series: SeriesObject
 // defaultOverlay?: OverlayModule
  top?: boolean
  td?: boolean
  onPromoClick?: VoidFunction
  onNavChange?: (state: boolean) => void
  onScrollStateChange?: (disabled: boolean) => void
  onTop?: VoidFunction
  onGalleryShow?: (list?: GalleryList) => void
  onHasKvOverlay?: (has: boolean) => void
}


export type GalleryList = {
  list:string[]
  index:number
}