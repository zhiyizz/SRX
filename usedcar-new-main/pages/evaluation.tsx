import React, { useCallback, useEffect, useState } from "react";
import BasePage from "@components/BasePage";
import TradeForm from "@components/TradeInfo";
import { trackPv } from "@utils/tracking";
import styles from "@styles/evaluation.module.scss";
const Evaluation = () => {
  useEffect(() => {
    trackPv('别克二手车-评估')
  },[])
  return (
    <BasePage className={styles.main} kv={'kv2'}>
    <div className={styles.evaluation}>
        <div className="container">
          <div className="wd">
            <div className="sub-title">在线评估</div>
            <h6>填写评估信息</h6>
            <TradeForm routerSource="evaluation" />
          </div>
          
        </div>

    </div>
    </BasePage>
  );
};

export default Evaluation;
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
