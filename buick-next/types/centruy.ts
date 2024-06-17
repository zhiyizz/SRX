

export type CenturyType = {
  features:FeatureJson[]
}
export type mediaType = {
  url:string,
  alt?: string,
  device?: 'pc' | 'mob',
  width?:number,
  height?:number,
  title?:string,
  content?:string,
  overlay?:boolean
  poster?:string
}
export type detailType = {
  type: 'simple' | 'slide'
  media?:mediaType
  slides?:{
    media:mediaType
  }[]

}
export type FeatureSlides = {
  media:mediaType
  slides?:{
    media:mediaType
  }[]
  detail?:detailType[]
}
export type FeatureJson = {
  nav:string
  slides:FeatureSlides[]
}
