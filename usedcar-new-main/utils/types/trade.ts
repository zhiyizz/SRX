
import { DealerType } from "./dealer";
export type ReplaceBrands = {
 /*品牌名称*/
 brandname?:string,
 /*首字母拼音缩写*/
 brandpy?:string
}
export type BrandList = {
  en: string,
  data: ReplaceBrands[]
}[];

export type EvalType = {
  ID:string,
  Initial:string,
  Name:string
}
export type Replace = {
  brands:ReplaceBrands[],
}

/**
 * 接口返回数据重新遍历设置统一格式
 */
export type apiSeriesType = {

  name:string,
  en:string,
  id?:string
}
/**
 * 对返回结果进行遍历分组
 */
export type apiSeriesSortType = {
  name?: string,
  en: string,
  data:apiSeriesType[]
}

export type apiEvaluationSeriesListType = {
  CarMfrs:{
    ID:string,
    Name:string
  },
  CarSeries:{
    ID:string,
    Name:string
  }[]
}
export type BrandModelType = {
  model:string,
  redbookCode:string
}
export type FormDataType = {
  /*路由来源 */
  routerSource:string,
   /*置换现有品牌数据 */

   brand?: BrandList,
   brandSeries?:string[] | undefined,
   brandModel?:BrandModelType[] | undefined,
   /*返回选择车牌 */
   onBackBrand?:(back:string) => void,
   /*返回选择车型 */
   onBackModel?:(back:string) => void,
   /**
   * 当地图组件就绪时触发事件。
   */
  onMapReady?: (p?: Point) => void
  /**
   * 当选择的经销商改变时触发事件。
   */
  onDealerSelectedChange?: (index: number) => void
  /**
   * 当经销商列表改变时触发事件。
   */
  onDealerChange?: (dealerList?: DealerType[]) => void,
    /**
   * 选定的经销商。
   */
    selectedDealerCode?: string,
    
  } 

