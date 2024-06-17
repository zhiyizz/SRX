
export type FeatureType = {
  title:string
  type?: "player | golf"
  tabs:TabsType[]
  gallery?:GalleryType[]
}

export type GalleryType = {
  url:string
  width:number
  height:number
}
export type TabsType = {
  tab:string
  content:{
    subTitle:string
    text?: string & string[]
  } & PlayerType & GolfType
}

export type PlayerType = {
  pic:string
  sign:{
    url:string
    width:number
    height:number
  }
  gallery:GalleryType[]
  childTabs:{
    tab:string
    content:{
        name?:string
        list:string[]
        text?: string & string[]
      
    }
  }[]
 
}

export type GolfType = {
  list:string[]
  text:string & string[]
  subTitle:string
  question:{
    q:string
    a:string
  }[]

}
export type HomeType = {
  /***
   * 子导航
   */
  subnav:string[]
  /**
   * 版块内容
   */
  features:FeatureType[]
}