import type { PromoIcons } from '@components/icons'
import type { SpecsTab } from '@components/series/Specs'
import type { VehicleColor } from '@components/series/Viewer'
import type { OverlayModule } from '@components/SeriesNavigation'
import type { ISeriesPrice } from '../utils/SeriesPrice'
import type { AvenirJson, FeatureJson, VeliteJson, VeliteIbuickApp, FeatureMedia } from './feature'
import type { KvMediaType, KvSlide } from './slider'
import type { ElectraType } from './electra'
import type { PanoStruct } from '@components/series/V2_Pano'
import type { CenturyType } from './centruy'
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

export function isSeriesObject(val: unknown): val is SeriesObject {
  const isObject = val && typeof val === 'object'

  if (isObject) {
    return 'code' in val && 'pic' in val
  }
  return false
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
   * 主导航放大显示。
   */
  navFull?: boolean
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
  /**
   * 新能源限定经销商（供Electra车系）。
   */
  xnyDealer?: boolean
  /**
   * 启用选配。
   */
  configurator?: boolean
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
   * 上标
   * @deprecated 已弃用，直接在`title`中使用`<sup>`标签代替。
   */
  sup?: string
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
  /**
   * Markdown格式保存的促销文字。
   */
  markdown?: string
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
   * 图片替代文本。
   */
  alt?: string
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

export function isSeriesProperty(value: unknown): value is SeriesProperty {
  const isObject = value && typeof value === 'object'

  if (isObject) {
    return ('carID' in value || 'carId' in value) && ('code' in value)
  }
  return false
}

export type KvInfoType = {
  /**
   * 图片URL。
   */
  url?: string
  /**
   * 图片替代文本。
   */
  alt?: string
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
  colors: VehicleColor[]
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

export function isSeriesExteriorProperties(val: unknown): val is SeriesExteriorProperties {
  const isObject = val && typeof val === 'object'

  if (isObject) {
    return 'colors' in val
  }
  return false
}

export function isSeriesExteriorBundle(val: unknown): val is SeriesExteriorBundle {
  const isObject = val && typeof val === 'object'

  if (isObject) {
    return 'url' in val
  }
  return false
}

export type SeriesViewerProperties = SeriesExteriorProperties | SeriesExteriorBundle

export type SeriesJson = {
  /**
   * 页面版本
   */
  version?:string
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
  features?: FeatureJson[]
  /**
   * 艾维亚FBI内容。
   */
  avenir?: {
    intro: KvMediaType[]
    fillColor?:string
    maskColor:string
    features: AvenirJson[]
  }
  /**
   * 世纪FBI内容。
   */
  century?: CenturyType
  /**
   * 新能源FBI内容。
   */
  velite?: {
    app: VeliteIbuickApp,
    features: VeliteJson[]
  }
  /**
   * 新能源ELECTRA FBI内容
   */
  electra?: ElectraType
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
    tabs?: SpecsTab[]
    shared?: SpecsTab[]
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
    media?: KvMediaType[]
    theme?:string
  }
  /**
   * 360外观内饰。
   */
  show?: SeriesViewerProperties & {
    /**
     * 外观底部提示文案。
     */
    tips?: string
    /**
     * 360内饰。
     */
    pano?: PanoStruct | {
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
      colors?: VehicleColor[]
      /**
       * BOSE外挂包URL（将覆盖 `tabs` 配置）。
       */
      bose?: string
      /**
       * 内饰底部提示文案
       */
      tips?:string,
    }
  }
  /**
   * 素材路径前缀。
   */
  prefix?: string
  /**
   * 新能源样式定义。
   * @deprecated 请使用 `theme` 字段代替。
   */
  electraTheme?: boolean
  /**
   * 用车指南连接。
   */
  tutorial?: string
  /**
   * 页面主题色。（默认：`red`）
   */
  theme?: 'blue' | 'red'
  /**
   * 星云展厅小程序码 (122x122px)。
   */
  xingyun?: FeatureMedia
}

export type SeriesPageProperties = {
  code: string,
  name?:string,
  data: SeriesJson
  series: SeriesObject
  defaultOverlay?: OverlayModule
  top?: boolean
  td?: boolean
  prefix: string
  promo?: string
  draftMode?: boolean
  onPromoClick?: VoidFunction
  onNavChange?: (state: boolean) => void
  onScrollStateChange?: (disabled: boolean) => void
  /**
   * “回到顶部”触发的事件回调。
   */
  onTop?: VoidFunction
  onGalleryShow?: (list?: GalleryList) => void
  onHasKvOverlay?: (has: boolean) => void
  /**
   * “回到顶部”按钮显示状态改变事件回调。
   * @param show 是否显示
   */
  onTopVisibleChange?: (show?: boolean) => void
}

export type CenturyPageProperties = {
  currentSeries: SeriesObject
  data: SeriesJson
  loanPicList?: string[]
  prefix?: string
  draftMode?: boolean
}

export type MediaEntity = {
  url: string
  alt?: string
  device: 'pc' | 'mob'
  type?: 'image' | 'video'
  width?: number
  height?: number
}

export type GalleryList = {
  list:string[]
  index:number
}
