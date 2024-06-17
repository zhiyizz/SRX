export type SpuInfo = {
  /* 车系 */
  seriesId:string
  /* 车型名 */
  spuName:string
  /* spuCode */
  spuCode:string
  /* 媒体车型id */
  mediaModelId:string
  /* 年份 */
  modelYear:string
  /* 基本配置 */
  basicConfig:string
  /* 升级配置 */
  advancedConfig:string
  packageId:string
  /* 车型图 */
  picList:string[]
  driverType:string
  /* 交付时间 */
  deliveryTime:string
  /* 价格 */
  rangePrice: string
  /* 官方指导价 */
  carGuidedPrice: string
  /* tp价 */
  transactionPrice:string
  grille:string
  /* 外饰颜色 */
  colorId:string
  /* 车顶颜色 */
  roofColor:string
  /* 内饰颜色 */
  innerColor:string
  /* 轮毂 */
  wheel:string
  appearanceDesign:string
  newDesignFlag: string
}
export type skuTypes = {
  seriesId:string
  /* spuCode */
  spuCode:string
  /* 车型名 */
  spuName:string
  mediaModelId:string
  modelYear:string
  /* 基本配置 */
  basicConfig:string
  advancedConfig:string
  packageId:string
  picList:string[]
  driverType:string
  /* 交付时间 */
  deliveryTime:string
  rangePrice: string
  /* 官方指导价 */
  carGuidedPrice: string
  transactionPrice:string
  grille:string
  colorId:string
  roofColor:string
  innerColor:string
  wheel:string
  appearanceDesign:string
  newDesignFlag: string
}


export type MscAttr = {
  /*属性代码*/
  attrCode:string
  /*属性名称*/
  attrName:string
  /*属性附属信息*/
  attrAddition?:string
  /*属性值*/
  attrValue:string
  /*属性值显示名*/
  showName?:string
  /*属性值附属信息-价格*/
  valueAddition?:string
  /*图片*/
  imgUrl?:string
  /*360*/
  pic360?:string[]
  carPic?:string
}
type MscAttrObj = {
  /*品牌*/
  brandId:string
  /*车系*/
  seriesId:string
  /*车系名*/
  seriesName:string
  /*车型*/
  modelId:string
  /*价格范围*/
  priceRange:string
  /*媒体车型*/
  mediaModelId:string
  /*官方指导价*/
  guidancePrice:string
  /*排量*/
  displacement:string
  /*车型年份*/
  modelYear:string
  /*外饰颜色*/
  colorId:string
  /*内饰颜色*/
  innerColor:string
  /*配置ID*/
  packageId:string
  /*工程代码*/
  engineerCode:string
  /*产品ID*/
  productId:string
  /*物料号*/
  materialNo:string
  /*新能源标识*/
  phevFlag:string
  /*官方指导价*/
  msrp:string
}
type MscPrice = {
  /*现金价*/
  cashPrice:string
  /*市场价*/
  marketPrice:string
  /*结算价*/
  settlementPrice:string
  /*附加价*/
  additionalPrice:string
  /*拓展价格1*/
  externalPrice1:string
  /*拓展价格2*/
  externalPrice2:string
}
type Customize = {
  ifDefault: string
  /*Sku中文名*/
  skuCnName:string
  /*内饰颜色名*/
  interiorName: string
  /*内饰图片地址*/
  interiorUrl:string
  /*内饰色块地址*/
  interiorColourUrl:string
  /*外饰颜色名*/
  exteriorName: string
  /*外饰色块地址*/
  exteriorColourUrl: string
  /*大图片地址*/
  bigPicUrl:string
  /*轮播图片地址*/
  sowingMapUrl:string
  /*订单图片地址*/
  orderdetailUrl:string
  /*360全景图*/
  pic360: string[]
}
export type AdditionalPkg = {
  /* 加装包code */
  attrCode: string
  attrValue:string
  /* 价格 */
  price: string
  attrName: string
  /* 展示名 */
  showName: string
  /* 轮播图 */
  imgUrls: string[]
}
export type GetSkuInfo = {
  skuCode:string
  skuName: string
  skuDesc: string
  spuCode: string
  externalId: string
  externalCode: string
  attrList: MscAttr[]
  attrObj: MscAttrObj
  price:MscPrice
  customize:Customize
  additionalPkgs:AdditionalPkg[]
}
export type attrList = {
  [key:string]:{
    attrValue:string
    price?:string
    name?:string
    imgUrl?:string
    pkgShow?:boolean 
  }
}
export type SkuInfo = {
  seriesId:string
  skuCode:string
  skuName:string
  price:number
  ticketFlag:boolean
  attrList:attrList
}