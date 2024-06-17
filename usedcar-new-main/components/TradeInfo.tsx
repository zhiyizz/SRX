import React, { FC, useEffect, useState } from "react";
import Loan from "./series/Loan";
import TradeForm from "./TradeForm";
import { getSeries } from "@utils/libs";
import { SeriesObject, SeriesCategory } from "@utils/types/series";
import { FormDataType } from "@utils/types/trade";
import styles from "@styles/components/tradeinfo.module.scss";

const TradeInfo:FC<FormDataType> = ({routerSource,brand,brandSeries,brandModel,onBackBrand,onBackModel}) => {
  const [series, SetSeries] = useState<SeriesObject[]>(null!);
  const [category, SetCategory] = useState<SeriesCategory[]>(null!);
  const [callbackSeriesEvent, setCallbackSeriesEvent] = useState<SeriesObject>();
  useEffect(() => {
    async function loadSeries() {
      const data = await getSeries();
      const arr = data.series.filter(item => (!item.flags?.mock  && item.flags?.testdrive) !== false )
      SetSeries(arr);
      data.category && SetCategory(data.category);
    }
    loadSeries();
  }, []);
  return (
    <div className="tradeinfo">
      <div className={styles["step-section"]}>
        {routerSource==="replace"?(
          <>
            <div className="trade_sub_title">
              <div className="trade_sub_title_en">STEP</div>
              <h6>
                <span>01</span>
                <b>选定意向新车车型</b>
              </h6>
            </div>
            <Loan series={series} category={category} callbackSeries={setCallbackSeriesEvent} />
          </>
        ):null}
       
       
        <TradeForm routerSource={routerSource} series={series} loan={callbackSeriesEvent} />
      </div>
    </div>
  );
};

export default TradeInfo;
