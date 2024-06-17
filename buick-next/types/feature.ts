import type { KvMediaType } from "./slider"

export type GeneralContent = {
  /**
   * 标题（换行用 `\n` 表示）。
   */
  title: string
  /**
   * 副标题（换行用 `\n` 表示）。
   */
  subTitle?: string
  /**
   * 内容（换行用 `\n` 表示）。
   */
  content: string
  /**
   * 替代内容。
   */
  alt?: string,
  /**
   * 媒体内容。
   */
  media?: KvMediaType[]

}

export type GeneralResource = {
  /**
   * 媒体内容。
   */
  media: FeatureMedia
  /**
   * 文案。
   */
  text: GeneralContent
}

export function isGeneralContent(val: unknown): val is GeneralContent {
  const isObject = val && typeof val === 'object'

  if (isObject) {
    return 'title' in val && 'content' in val
  }
  return false
}

export function isGeneralResource(val: unknown): val is GeneralResource {
  const isObject = val && typeof val === 'object'

  if (isObject) {
    return 'media' in val && 'text' in val
  }
  return false
}

// type MultiResource = {
//   /**
//    * 媒体内容。
//    */
//   media: FeatureMedia[]
//   /**
//    * 文案。
//    */
//   text: GeneralContent[]
// }

type BigPictureResource = {
  /**
   * 媒体内容。
   */
  media: KvMediaType | KvMediaType[]
  /**
   * 文案。
   */
  text: GeneralContent
}
type PictureResource = {
  type: 'simple'
  /**
   * 媒体内容。
   */
  media:FeatureMedia
  /**
   * 文案。
   */
  text: GeneralContent
}

type FeatureBase = {
  /**
   * 图片尺寸（默认：`small`）。
   */
  size?: 'full' | 'large' | 'small'
  /**
   * 图片对齐方式（默认：`left`）。
   */
  align?: 'left' | 'right'
}

export type PictureResourceSlideType = {
   /**
   * 显示类型。
   */
   type: 'slider'
} & ({
  /**
   * 单图文字轮播。
   */
  media: FeatureMedia
  /**
   * 轮播文字。
   */
  slides: GeneralContent[]
} | {
  media: undefined
  /**
   * 图文轮播内容。
   */
  slides: GeneralResource[]
})

export type FeatureMedia = {
  /**
   * 媒体的URL。
   */
  url: string
  /**
   * 媒体类型。
   */
  type?: 'image' | 'video'
  /**
   * 图片替代显示名称。
   */
  alt?: string
  /**
   * 视频静帧图。
   */
  poster?: string
  /**
   * 媒体内容的高度（单位：*px*）。
   */
  height?: number
  /**
   * 媒体内容的宽度（单位：*px*）。
   */
  width: number,

  /**
   * 自定义文字图片
   */
  textImage?: boolean
}

/**
 * FBI发动机板块。
 */
export type FeatureEngineType = FeatureBase & FeatureCaptionType & {
  /**
   * FBI点的显示类型。
   */
  type: 'engine'
  /**
   * 媒体内容。
   */
  media: FeatureMedia
  /**
   * 文案。
   */
  text?: GeneralContent
  /**
   * 发动机的详细内容。
   */
  engine: {
    /**
     * 高亮显示的内容（显示在顶部的大字）。
     */
    highlight?: GeneralContent
    /**
     * 其他技术点。
     */
    specs: (GeneralContent & {
      highlight?: boolean
    })[]
  }
  /**
   * 额外内容。
   */
  extra?: {
    /**
     * 媒体内容（可选）。
     */
    media?: FeatureMedia
    /**
     * 顶部文案（可选）。
     */
    text?: string
  }
}

/**
 * FBI轮播板块。
 */
export type FeatureSlideType = FeatureBase & FeatureCaptionType & {
  /**
   * FBI点的显示类型。
   */
  type: 'slider'
} & ({
  /**
   * 单图文字轮播。
   */
  media: FeatureMedia
  /**
   * 轮播文字。
   */
  slides: GeneralContent[]
} | {
  media: undefined
  /**
   * 图文轮播内容。
   */
  slides: GeneralResource[]
})

/**
 * FBI列表板块。
 */
export type FeatureListType = FeatureCaptionType & {
  /**
   * FBI点的显示类型。
   */
  type: 'list'
  /**
   * 内容列表。
   */
  list: GeneralResource[]
}
/**
 * FBI通用板块。
 */
export type FeatureGeneralType = FeatureBase & FeatureCaptionType & GeneralResource & {
  /**
   * FBI点的显示类型。
   */
  type?: 'simple' | 'dual' | 'triple' 
  /**
   * 其他内容（只在 `type` = `dual` ｜ `triple` 时有效）。
   */
  extra?: GeneralResource | FeatureMedia[]
}


export type FeatureCaptionType = {
  caption?: {
    /**
     * 主色调标题（换行用 `\n` 表示）。
     */
    title: string
    /**
      * 内容（换行用 `\n` 表示）。
      */
    content?: string
  }
}

/**
 * FBI内容板块。
 */
export type Feature =  FeatureGeneralType | FeatureEngineType | FeatureSlideType | FeatureListType 

export type FeatureObject = {
  /**
   * 外层左侧导航显示名称。
   */
  nav: string
  /**
 * 标题上方显示的内容
 */
  suptitle?:string
  /**
   * 外层显示的标题。
   */
  title: string
  
  /**
   * 外层显示的内容（换行用 `\n` 表示）。
   */
  content: string
  /**
   * 幅内容
   */
  subContent?: string

  /**
   * 提示内容
   */
  tips?: string
  /**
   * 外层的媒体内容。
   */
  media: KvMediaType | KvMediaType[]
  /**
   * 是否为长图（只对手机端有效）。
   */
  isScroll?: boolean
  /**
   * 使用深色文字。
   */
  dark?: boolean
}

export type FeatureCategory = {
  /**
   * 中文名称。
   */
  text: string
  /**
   * 英文名称。
   */
  en: string
}

export type FeatureMediaPrefix = {
  /**
   * 媒体文件路径。
   */
  prefix: string,
   /**
   * 监测名称
   */
  name?:string,
}

/**
 * FBI对象。
 */
 export type FeatureJson = FeatureObject & {
  /**
   * 外层左侧导航显示名称。
   */
  nav: string
  /**
   * FBI分类（用于内容弹层顶部标题）。
   */
  category: FeatureCategory
  /**
   * FBI弹层的内容。
   */
  detail: Feature[]
  /**
   * FBI新弹层
   */
  common?: boolean
  /**
   * FBI弹层窄平
   */
  layout?: 'narrow'
  /**
   * 一级文案字号大小
   */
  fontSize?: string
  /**
   * 一级页面多级展示
   */
  slides: FeatureJson[]
}

export type AvenirJson = {
  /**
   * 板块起始居中显示的标题。
   */
  title: FeatureCategory
  /**
   * 标题下方显示的内容。
   */
  content: string
  /**
   * 外层的媒体内容。
   */
  media: KvMediaType | KvMediaType[]
  /**
   * FBI分类（用于左上角标题）。
   */
  category: FeatureCategory
  /**
   * 详情内容页。
   */
  detail: BigPictureResource[]
  /**
   * 详情内容页V2。
   */
  detailV2:PictureResource[] | PictureResourceSlideType[]
  /**
   * 额外内容集合（支持2-3项，如为数组则显示为轮播）。
   */
  extra?: (GeneralResource | GeneralResource[])[]
}

type VeliteFeatureMedia = FeatureMedia & {
  device?: 'pc' | 'mob'
}

type VeliteResource = {
  media?: VeliteFeatureMedia | VeliteFeatureMedia[]
  text?: GeneralContent
}

// type VeliteIbuick = {
//   title: VeliteFeatureMedia | VeliteFeatureMedia[]
//   content: GeneralContent
// }

export type VeliteEngineType = GeneralResource & {
  type: 'engine'
  engine: {
    /**
     * 技术点。
     */
    specs: GeneralContent[]
  }
}

export type VeliteSliderType = {
  type: 'slider'
  direction: 'horizontal' | 'vertical'
  content: VeliteResource[]
}

export type VeliteListType = {
  type: 'list'
  /**
   * 平铺排列（仅限手机端）。
   */
  tiled?: boolean
  content: (VeliteResource | VeliteResource[])[]
}

export type VeliteIbuickApp = {
  features: VeliteIbuickApp
  url: string[]
  type: 'ibuickapp'
  tab: string[]
  content: GeneralContent[][]
}

export type VeliteFullPageType = BigPictureResource & {
  type: 'full'
}

export type VeliteDifferType = {
  type: 'diff'
  text: GeneralContent
  media: {
    before: KvMediaType[]
    after: KvMediaType[]
  }
}

type VeliteFeature = VeliteEngineType | VeliteSliderType | VeliteListType | VeliteFullPageType | VeliteDifferType 

export type VeliteKvResource = BigPictureResource & FeatureBase & {
  extra?: GeneralContent[]
  light?: KvMediaType | KvMediaType[]
}

export type VeliteJson = {
  kv: VeliteKvResource
  category: FeatureCategory
  features?: VeliteFeature[]
}
