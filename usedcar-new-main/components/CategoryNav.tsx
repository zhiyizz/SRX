import { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import AliImage from "./AlImage";
import classNames from "classnames";
import { SeriesObject, SeriesCategory } from "@utils/types/series";
import "swiper/css";
import styles from "@styles/components/categorynav.module.scss";
export type LoanProperties = {
  series: SeriesObject[];
  category: SeriesCategory[];
  onSeriesEvent: (arg: SeriesObject | undefined) => void
};

const CategoryNav: FC<LoanProperties> = ({ series, category,onSeriesEvent }) => {
  const [seriesList, setSeriesList] = useState<(SeriesObject | undefined)[] | undefined>();
  const [categoryType, setCategoryType] = useState<string[]>(null!);
  const [categoryActive, setCategoryActive] = useState<number | string | null>("all");
  useEffect(() => {
    /**
     * 通过seriescategorylist接口返回的数据匹配车贷方案的车型选择列表
     * @returns
     * setCategoryType:Array 返回车系列表
     * setSeriesList:Array 返回车型列表
     */
    const arr: string[] = [];
    const _seriesList: SeriesObject[] = [];
    category?.forEach((category_series) => {
      category_series.series?.forEach((item_car: string) => {
        series.forEach((car) => {
          if (car.code === item_car) {
            arr.push(category_series.name);
            _seriesList.push(car);
          }
        });
      });
      const navResult = Array.from(new Set(arr));
      setCategoryType(navResult);
      setSeriesList(_seriesList);
    });
  }, [category, series]);
  const categoryNavEvent = (idx: number | string) => {
    //通过后台接口获取车型匹配
    if(Number(idx) >= 0){
      setCategoryActive(Number(idx));
      //通过category匹配当前选中
      const categoryCurrentSeries: SeriesCategory = category?.find((cat) => cat.name === categoryType[Number(idx)])!;
      const seriesCurrentList = categoryCurrentSeries?.series?.map((code: string) => series.find((item: { code: string }) => code === item.code));
      setSeriesList(seriesCurrentList);
    }else{
      //全部
      setCategoryActive(String(idx));
      //通过category匹配当前选中
      const _seriesList: SeriesObject[] = [];
      category.forEach((category_series) => {
        category_series.series?.forEach((item_car: string) => {
          series.forEach((car) => {
            if (car.code === item_car) {
              _seriesList.push(car);
            }
          });
        });
        setSeriesList(_seriesList);
      });
    }

  };

  return (
  
    <div className={styles.category_nav}>
      <div className="sub-title">
      <ul className={styles.category_sub_tab}>
        <li className={categoryActive === "all" ? styles.active : ""} onClick={() => categoryNavEvent("all")}>
          全部车型
        </li>
        {categoryType?.map((item: string, idx: number) => {
          return (
            <li key={idx} className={categoryActive === idx ? styles.active : ""} onClick={() => categoryNavEvent(idx)}>
              {item}
            </li>
          );
        })}
      </ul>
      </div>

      <div className={styles.category_sub_main}>
        <Swiper
          observer={true}
          observeParents={true}
          className={styles["swiper-box"]}
          breakpoints={{
            320: {
              slidesPerView: 1.75,
              spaceBetween: 10,
            },
            767.98: {
              slidesPerView: 5,
            },
            991.98: {
              slidesPerView: 6,
            },
          }}
        >
          {seriesList &&
            seriesList?.map((item, idx) => {
              if (item) {
                return (
                  <SwiperSlide
                    key={idx}
                    className={styles.slide}
                    onClick={() => {
                      onSeriesEvent(seriesList[idx])
                      // trackEvent(`金融方案-车贷方案-车型选择-${item.name}`)
                    }}
                  >
                    <div className={styles.pic}>
                      <AliImage src={item.pic} alt="" width={800} height={640} />
                    </div>
                    <div className={styles.inner}>
                      <div className={styles.name}>{item.name}</div>
                    </div>
                  </SwiperSlide>
                );
              }
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default CategoryNav;
