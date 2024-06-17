import React, { useCallback, useEffect, useState } from "react";
import BasePage from "@components/BasePage";
import KvSlide from "@components/KvSlide";
import SubMenu from "@components/SubMenu";
import SvgIcon from "@components/icons";
import TradeForm from "@components/TradeInfo";
// import { BrandList,Brand } from "@utils/types/trade";
// import { useReplace,useReplaceList,useReplaceModelList } from "@utils/request";
import { trackPv } from "@utils/tracking";
import styles from "@styles/replacement.module.scss";
const Replacement = () => {

  useEffect(() => {
    trackPv('别克二手车-置换')
  },[])
  return (
    <div className={styles.replace}>
      <BasePage className={styles.main} kv={"kv1"}>
        <div className="container">
          <div className={styles.section}>
            <div className="wd">
              <div className="sub-title">置换信息</div>
              <div className={styles.step}>
                <div className={styles.stepwrap}>
                  <div className={styles.icon}>
                    <SvgIcon icon="newcar" />
                    <p>选择意向新车</p>
                  </div>
                  <div className={styles.icon}>
                    <SvgIcon icon="replace" />
                    <p>预约置换服务</p>
                  </div>
                  <div className={styles.icon}>
                    <SvgIcon icon="phone" />
                    <p>经销商回电预约</p>
                  </div>
                  <div className={styles.icon}>
                    <SvgIcon icon="hand" />
                    <p>线下置换</p>
                  </div>
                </div>
              </div>
              <div className="sub-title">预约信息</div>
              <TradeForm  routerSource='replace' />
              {/* <TradeForm  routerSource='replace' brand={brand} brandSeries={BrandSeriesList?.series} brandModel={BrandModelList?.model}  onBackBrand={setBackBrand} onBackModel={setBackBrandModel} /> */}
            </div>

          </div>
        </div>
      </BasePage>
      
    </div>
  );
};

export default Replacement;

export const getStaticProps = async () => {
  try {
     return {
       props:{},
       revalidate: 21600,
     }
  } catch (ex) {
    console.error(ex)
    return {
      props:{}
    }
  }
}
