import useSWR, { Key, Fetcher } from "swr";

import { DealerObject } from "./dealer";
import { CarListType } from "./types/carlist";
import { ProvinceType } from "./types/province";
import { combineUrl,sortEnList } from "./helper";
import { LoanCarInfo } from "./types/gmac";
import { Replace,EvalType,apiEvaluationSeriesListType  } from "./types/trade";

class DataFetchError extends Error {
  status?: number;
  data?: string;

  constructor(message?: string) {
    super(message);
    this.name = "DataFetchError";
  }
}

const fetcher = async (input: string, data?: Record<string, string>) => {
  const url = input; // /^https?:/.test(input) ? input : `${process.env.NEXT_PUBLIC_API_PREFIX || ''}/${input.replace(/^\.*\//, '')}`

  let init: RequestInit;
  if (data) {
    init = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data),
    };
  }

  const res = await fetch(url, init!);

  if (!res.ok) {
    const error = new DataFetchError("数据获取失败。");
    error.data = await res.text();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

type carList ={
  brand:string,
  pagenum:number,
  pagesize:number,
  province:string,
  orderby?:string,
  sortby?:string,
  series?:string,
  price?:number | null,
  model?:string,
  carold?:number | null,
  gearbox?:string,
  carkm?:number | null, 
  dspm?:number | null,
  color?:string,
  /*同车系 */
  same?:boolean
}

export function useCarList({brand, pagenum, pagesize, province,orderby = '',sortby= '',series= '',price,model='',carold,gearbox='',carkm,dspm,color= '',same}:carList) {
  /*更多车型列表 */
 // const { data, error } = useSWR<CarListType, Error>(province ? `https://chengxinmobile.saic-gm.com/api/car_list.ashx?brand=${brand}&pagenum=${pagenum}&pagesize=${pagesize}&province=${province}` : null, fetcher, { revalidateOnFocus: false });
  const { data, error } = useSWR<CarListType, Error>(province ?  `https://chengxinmobile.saic-gm.com/api/car_list.ashx?brand=${brand}&pagenum=${pagenum}&pagesize=${pagesize}&province=${province}&orderby=${orderby}&sortby=${sortby}&series=${series}&price=${price}&model=${model}&carold=${carold}&gearbox=${gearbox}&carkm=${carkm}&dspm=${dspm}&color=${color}`
  : same ?
  `https://chengxinmobile.saic-gm.com/api/car_list.ashx?brand=${brand}&pagenum=${pagenum}&pagesize=${pagesize}&province=${province}&series=${series}`
  :null,
    fetcher, 
    { revalidateOnFocus: false });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export type ProvinceData = {
  /**
   * 静态地理位置数据
   */
  province: {
    /*省份id*/
    proid: string;
    /*省份自治区名称*/
    proname: string;
    /*首拼音简写*/
    propy: string;
    citys: {
      /*城市id*/
      cityid: string;
      /*城市名称*/
      cityname: string;
      /*首拼音简写*/
      citypy: string;
    }[];
  }[];
};

type carinfoType = {
    total: number,
    cars: {
            vhclId: string,
            redbookCode:string,
            companyCode: string,
            brand: string,
            series: string,
            dspm: string,
            vhclType: string,
            fuel: string,
            model: string,
            gearBox: string,
            signDate: string,
            realsingDate: string,
            color: string,
            mileage:string,
            price: string,
            authType:string,
            withLicense: string,
            insureDate:string,
            status:string,
            point:string,
            vehiclePackage: string,
            vehicleCity: string,
            licenseCity: string,
            engine: string,
            license: string,
            needShowLicense: string,
            needShowEngine:string,
            vehicleType: string,
            circulationTimes: string,
            hasMaintenanceRecords: string,
            examDueDate: string,
            roadTollDueDate: string,
            travelUseTaxDueDate:string
            localChargesDueDate: string,
            localChargesRemark: string,
            certStat: string,
            certNum: string,
            dealer: {
                province:string,
                city: string,
                VendorCode: string,
                VendorFullName: string,
                VendorShortName: string,
                DepartmentId:string,
                Linkman: string,
                Linkphone: string,
                Address: string,
                in_sale_count: string
            },
            redbook: {
                Type:string,
                Engine:string,
                GearBox:string,
                Model: string,
                BoxNumber: string,
                Power: string,
                LoadNumber:string,
                Fuel: string,
                DSPM: string,
                ModelYear: string,
                ModelMonth: string
            },
            pics: {
                left45:string,
                right45: string,
                engine:string,
                front: string,
                behind: string,
                side: string,
            },
            addition_pics: string[]
        }[]
    
}


export function useCarInfo(id:string){
  const { data, error } = useSWR<carinfoType>(id?`https://chengxinmobile.saic-gm.com/api/car_detail.ashx?ids=${id}`:null, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    data: data?.cars[0],
    isLoading: !error || !data,
    isError: error,
  };
}

export function useProvince() {
  const { data, error } = useSWR<ProvinceData>("/api/province.json", fetcher, {
    revalidateOnFocus: false,
  });

  return {
    data: data,
    isLoading: !error || !data,
    isError: error,
  };
}


export function useApiSeries(type: string) {
  /*现有品牌*/
  const { data: replaceSeries, error: relaceErr } = useSWR<Replace>(type === 'replace' || type === 'sell' ? combineUrl(process.env.NEXT_PUBLIC_API_BRAND, "/apinew/second_hand_car_brand_list?type=all") : null, fetcher, { revalidateOnFocus: false });
  const { data: evaluationSeries, error: evalErr } = useSWR<EvalType[]>(type === 'evaluation' ? combineUrl(process.env.NEXT_PUBLIC_API_BRAND, `/apinew/iautos_interface?act=brand_list`) : null, fetcher, { revalidateOnFocus: false });
  return {
    replaceSeries,
    evaluationSeries,
    isLoading: (!relaceErr || !evalErr ) && (!replaceSeries || !evaluationSeries),
    isError: relaceErr || evalErr,
  };


}

 export  function  useSeriesList({routerSource,brand}:{routerSource:string,brand:string}){
   /*现有车系 */
   const {data:replace,error:relaceErr} =  useSWR<{series:string[]}>((routerSource === 'replace' || routerSource === 'sell')  && brand?combineUrl(process.env.NEXT_PUBLIC_API_BRAND, `/apinew/second_hand_car_brand_series_list?type=all&brand=${brand}`):null,fetcher,{revalidateOnFocus: false});
   const { data:evaluation,error:evalErr } = useSWR<apiEvaluationSeriesListType[]>(routerSource==='evaluation' && brand ?combineUrl(process.env.NEXT_PUBLIC_API_BRAND, `/apinew/iautos_interface?act=series_list&brand_id=${brand}`):null, fetcher, { revalidateOnFocus: false });
   return {
     replace:replace?.series,
     evaluation,
     isLoading:(!relaceErr || !evalErr ) && (!replace || !evaluation),
     isError: relaceErr ||  evalErr,
   };
 }

 type ReplaceModelType = {
    model:string,
    redbookCode?:string
}

 type EvalModelType =  {
  Displacement: string,
  ID: string,
  Name?: string,
  Price: string,
  TransmissionType: string,
  VersionYear: string,
  ProductionYear: string,
  VersionDate: string,
  is_new_energy:string
}
//  type ModelType = {
//   name:string | undefined,
//   id:string | undefined,
// }

export function useSeriesModel({routerSource,brand,series,year}:{routerSource:string,brand:string,series?:string,year?:string}){
  /*现有车型*/
  const {data:replace,error:relaceErr}  =  useSWR<{model:ReplaceModelType[]}>((routerSource==='replace' || routerSource==='sell') && brand && series ? combineUrl(process.env.NEXT_PUBLIC_API_BRAND, `apinew/second_hand_car_brand_series_model_list?brand=${brand}&series=${series}`):null,fetcher,{revalidateOnFocus: false});
  const { data:evaluation,error:evalErr} =  useSWR<EvalModelType[]>(series  && year? combineUrl(process.env.NEXT_PUBLIC_API_BRAND, `apinew/iautos_interface?act=model_list&series_id=${series}&year=${year}`):null,fetcher,{revalidateOnFocus: false});

  return {
    replace,
    evaluation,
    isLoading: !relaceErr &&  !evalErr && !replace && !evaluation ,
    isError: relaceErr ||  evalErr,
    };
}

export function useEvaluationYear({routerSource,series_id}:{routerSource:string,series_id:string}){
  /*评估购车年份*/
  const {data,error} =  useSWR<string[]>(routerSource==='evaluation' && series_id ? combineUrl(process.env.NEXT_PUBLIC_API_BRAND, `/apinew/iautos_interface?act=year_list&series_id=${series_id}`):null,fetcher,{revalidateOnFocus: false});
  return {
     data:data,

     isLoading: !error && !data ,
     isError: error,
   };
}

 type evalApplyType = {
  submit:boolean,
  model_id:string,
  type?:number,
  mile:string,
  city:string,
  licensingdate:string,
}


export type evalApplyResultType = String[] & {
  BuyPrice:string,
  ModelID:string,
  SellPrice:string
}
export function useEvaluationApply({submit=false, model_id,type=1,mile, city,licensingdate}:evalApplyType){
   /*评估返回结果(较差，正常，优秀) */
   const {data:bad,error:badError} =  useSWR<evalApplyResultType>(submit ? combineUrl(process.env.NEXT_PUBLIC_API_BRAND, `/apinew/iautos_interface?act=used_price_mileage_all_city&model_id=${model_id}&type=${type}&mile=${mile}&city=${city}&licensingdate=${licensingdate}&condition=4`):null,fetcher,{revalidateOnFocus: false});
   const {data:ordinary,error:ordinaryError} =  useSWR<evalApplyResultType>(submit ? combineUrl(process.env.NEXT_PUBLIC_API_BRAND, `/apinew/iautos_interface?act=used_price_mileage_all_city&model_id=${model_id}&type=${type}&mile=${mile}&city=${city}&licensingdate=${licensingdate}&condition=3`):null,fetcher,{revalidateOnFocus: false});
   const {data:good,error:goodError} =  useSWR<evalApplyResultType>(submit ? combineUrl(process.env.NEXT_PUBLIC_API_BRAND, `/apinew/iautos_interface?act=used_price_mileage_all_city&model_id=${model_id}&type=${type}&mile=${mile}&city=${city}&licensingdate=${licensingdate}&condition=2`):null,fetcher,{revalidateOnFocus: false});
  //  let resultJson = [];
  //   bad && ordinary && good && resultJson.push(bad,ordinary,good)
   return {
      bad,
      ordinary,
      good,
      isLoading: !goodError && !badError && goodError  && !bad && !ordinary && !good ,
      isError: badError && ordinaryError && goodError,
    };
}

// export function useEvaluation(type:string){
//  /*评估车型 */
// const {data,error} = useSWR<Replace>(type === 'evaluation'? combineUrl(process.env.NEXT_PUBLIC_API_BRAND, `apinew/iautos_interface?act=brand_list`):null,fetcher,{revalidateOnFocus: false});
//   return {
//     data:data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// }

export function useServiceData() {
  const { data, error } = useSWR<DealerObject[], Error>(combineUrl(process.env.NEXT_PUBLIC_STATIC_HOST, "/resource/service.json"), fetcher, { revalidateOnFocus: false });
  
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
/**
 * 车型配置数据结构。
 */
export type SpecsDataType = {
  /**
   * 车型名列表。
   */
  name: {
    /**
     * 车系。
     */
    car: string;
    /**
     * 车系英文名。
     */
    car_en: string;
    /**
     * 车型。
     */
    model: string;
    /**
     * 车型英文名。
     */
    model_en: string;
    /**
     * 官方价格。
     */
    price: string | number | null;
    /**
     * NEDC纯电行驶里程。
     */
    NEDC?: string;
    /**
     * CLTC纯电行驶里程。
     */
    CLTC?: string;
    /**
     * 补贴后售价。
     */
    discount?: string;
  }[];
  /**
   * 配置信息。
   */
  spec: {
    /**
     * 配置分类。
     */
    catalog: string;
    /**
     * 配置详情。
     */
    content: {
      /**
       * 配置项目。
       */
      k: string;
      /**
       * 是否合并单元格。
       */
      m?: boolean;
      /**
       * 配置数据。
       */
      v: string[];
    }[];
  }[];
};

export function useSpecsData(code: string, preview = false) {
  const { data, error } = useSWR<SpecsDataType>(preview ? `/webapi/seriesspecifications?code=${code}` : combineUrl(process.env.NEXT_PUBLIC_STATIC_HOST, `/resource/specifications/${code}.json`), fetcher, { revalidateOnFocus: false });

  return {
    data,
    isLoading: !error && !data,
    error,
  };
}

export function useDealerData() {
  const { data, error } = useSWR<DealerObject[], Error>(combineUrl(process.env.NEXT_PUBLIC_STATIC_HOST, '/resource/dealer.json'), fetcher, { revalidateOnFocus: false })
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}


export function useDealerEv(auto = false) {
  const { data, error } = useSWR<DealerObject[], Error>(auto && combineUrl(process.env.NEXT_PUBLIC_STATIC_HOST, '/resource/dealer_xny.json'), fetcher, { revalidateOnFocus: false })

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}