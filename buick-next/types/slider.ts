/**
 * 表示KV大图的媒体对象。
 */
export type KvMediaType = {
  /**
   * 媒体的URL。
   */
  url: string
  /**
   * 媒体对应的显示设备。
   */
  device: 'pc' | 'mob'
  /**
   * 图片替代文本。
   */
  alt?: string
  /**
   * 媒体的纵向对齐方式。
   */
  align?: 'top' | 'middle' | 'bottom'
  /**
   * 媒体类型。
   */
  type?: 'image' | 'video'
  /**
   * 轮播图链接。
   */
  link?: string
  /**
   * 视频静帧图。
   */
  poster?: string
  /**
   * 视频静帧类型。
   */
  postertype?: string
  /**
   * 弹层播放完整媒体
   */
  overlay?: boolean,
   /**
   * 弹层媒体URL
   */
  overlayUrl?: string
}

/**
 * 表示轮播图弹层的媒体（图片）对象。
 */
type KvOverlayMedia = {
  /**
   * 媒体的URL。
   */
  url: string
  /**
   * 图片替代文本。
   */
  alt?: string
  /**
   * 媒体对应的显示设备。
   */
  device: 'pc' | 'mob'
  /**
   * 轮播图链接。
   */
  link?: string
  /**
   * 媒体的高度。
   */
  height?: number
  /**
   * 媒体的宽度。
   */
  width?: number
}

/**
 * 表示轮播图打开的额外弹层。
 */
export type KvOverlay = {
  /**
   * 媒体内容。
   */
  media: KvOverlayMedia[]
  /**
   * 媒体标签。
   */
  label?: string
  remark?: string
  remarkBg?: string
  /**
  * 购车礼遇浮层更多按钮显示开关
  * @deprecated 不再使用该属性，而是直接判断传入的`promo`参数
  */
  more?: boolean
  /**
   * 皮肤
   */
  theme?: 'light'
}

/**
 * 表示轮播图上的互动操作。
 */
type SlideAction = {
  /**
   * 显示金融政策（只对车型页有效）。
   */
  promo?: boolean
  /**
   * 跳转链接。
   */
  link?: string
  /**
   * 移动端跳转链接。
   */
  link_m?: string
  /**
   * 显示文字。
   */
  text?: string
  /**
   * 弹层内容。
   */
  overlay?: KvOverlay
  /**
   * 显示设备。
   */
  device?: 'pc' | 'mob'
  /**
   * 按钮样式（仅跳转链接）。
   */
  theme?: 'solid'
}

export type KvSlideContent = {
  id?: number
  top?: number | string
  /**
   * 如为 `true` 则为右侧对齐。
   */
  right?: number | string | true
  bottom?: number | string
  left?: number | string
  center?: boolean
  device?: 'pc' | 'mob'
  /**
   * 主标题。
   */
  title?: string | {
    /**
     * 标题文字。
     */
    text: string
    /**
     * 标题图标。
     */
    icon: string
    /**
     * 标题图标替代文案。
     */
    alt?: string
    /**
     * 图标宽度。
     */
    width: number
    /**
     * 图标高度。
     */
    height: number
    /**
     * 图标位置（默认：`right`）。
     */
    pos?: 'right' | 'left'
  }
  /**
   * 副标题（显示在主标题上方）。
   */
  subTitle?: string
  /**
   * 内容。
   */
  content?: string
  /**
   * 文字的颜色（默认：`dark`）。
   */
  theme?: 'dark' | 'light' | 'shadow'
  /**
   * 内容图片URL（将忽略文字）。
   */
  url?: string
  /**
   * 内容图片替代文案。
   */
  alt?: string
  /**
   * 内容图片的宽度。
   */
  width?: number
  /**
   * 内容图片的高度。
   */
  height?: number
  /**
   * 额外内容（君威）。
   */
  extra?: {
    title: string
    content: string
  }[]
}

/**
 * 表示轮播图的对象。
 */
export type KvSlide = {
  /**
   * 轮播图ID。
   */
  id: number
  /**
   * 限制手机端轮播图。
   */
  mobile?: boolean

  isDeleted?:boolean

  isLaunch?:boolean

  testingIdx?:number

  hashCode?:string | null

  /**
   * 轮播图名称（仅用作监测）。
   */
  name: string
  /**
   * 轮播图的媒体素材（可为图片或视频）。
   */
  media: KvMediaType[]
  /**
   * 轮播图上的文字内容。
   */
  text?: KvSlideContent | (KvSlideContent | null)[] | null
  /**
   * 轮播图上显示的互动按钮。
   */
  action?: SlideAction[]
  /**
   * 是否隐藏车型信息。
   */
  hideInfo?: boolean
  /**
   * 右下角提示内容
   */
  tips?: string
  /**
   * 底部注释说明。
   */
  remark?: string | {
    id?:number
    /**
     * 注释文字。
     */
    text: string
    /**
     * 底部对齐方式。
     */
    align?: 'left' | 'right'
  }
}
