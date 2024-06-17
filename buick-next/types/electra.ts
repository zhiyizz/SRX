import type { KvMediaType } from './slider'

export type mediaType = {
  url:string,
  device?: 'pc' | 'mob',
  alt?: string,
  width?:number,
  height?:number,
  title?:string,
  content?:string,
  overlay?:boolean
}

type textType = {
  title:string,
  content:string
}

type avenirType = {
  maskColor: string,
  intro: KvMediaType[]
}
export type detailType = {
  type: 'simple' | 'slide'
  media?:mediaType
  slides?:{
    media:mediaType,
    text?:textType
  }[]
  text:textType | textType[]

}
export type subkvType = {
  /**
   * 轮播展示
   */
  slide?:boolean
  /**
   * 轮播图标题。
   */
  title:string
  /**
   * 轮播图内容。
   */

  content:string  
  /**
   * 艾维亚动画开关
   */
  intro?:boolean
  /**
   * 二级页面标题英文。
   */
  en?:string
  /**
   * FBI 文案上下位置标注。
   */
  pos?:'bottom'
  /**
   * FBI 自定义样式
   */
  classname?:string
  /**
   * 二级页面显示按钮开关。
   */
  overlay?:boolean
  /**
   * 视频类型
   */
  type?:'video'
  /**
   * FBI图片路径
   */
  media?: mediaType[] 
  /**
   * 二级页面内容展示类型（轮播图/普通）。
   */
  detail?: detailType[]
  /**
   * FBI点底部文案提示。
   */
  declaration?:string
  /**
   * 车型配置简讯。
   */
  specs?:{
    title:string
    num:number
    unit:'mm'
  }[]
  /**
   * FBI 视频弹窗
   */
  videoOverlay?:mediaType[]  
}
export type featuresType = {
  category:{
    title:string
    en:string
  },
  subkv: subkvType[],
  detail: detailType[]
}

export type UltiumType = {
  ultium:{
      title:string
      media:mediaType[]
    }
}



export type ElectraType = {
  electra_avenir?:avenirType
  features:featuresType[]
  ultium:{
    title:string
    media:mediaType[]
  },
  preview:{
    media:mediaType[]
    title:string
    content:string
  }[]
   fbinav:string[]
  
}
