
import { FC, useEffect, useState } from "react";
import CategoryNav from "@components/CategoryNav";
import { SeriesObject, SeriesCategory } from "@utils/types/series";
export type LoanProperties = {
  series: SeriesObject[];
  category: SeriesCategory[];
  callbackSeries: (arg: SeriesObject | undefined) => void
};
const Loan:FC<LoanProperties> = ({series,category,callbackSeries}) => {
  return <CategoryNav series={series} category={category} onSeriesEvent={callbackSeries} />;
};

export default Loan;
