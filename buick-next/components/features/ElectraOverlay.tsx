import { type FC, useEffect, useRef, useState } from 'react';
import Scrollbar from 'smooth-scrollbar';
import AliImage from '@components/AlImage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import type { detailType } from '~types/electra';
// import styles from '@styles/electra_e5.module.scss';
import styles from '@styles/components/e5-fbi-overlay.module.scss';
import 'swiper/css';
import { combineUrl, divideByElement } from '@utils/helper';
import classNames from 'classnames';
type propType ={
  data?:detailType[],
  code:string,
  overlay:boolean,
  category?:{
    title:string,
    en:string
  }
  prefix?: string
  setOverlayShow:(arg:boolean) => void
}
const ElectraDetail: FC<propType> = ({ data, overlay, category, prefix, setOverlayShow }) => {
  const [hide,setHide] = useState<boolean>();
  const scrolloverlay = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrolloverlay.current) {
      Scrollbar.init(scrolloverlay.current, {
        alwaysShowTracks: true
      })
    }
  }, [])
  useEffect(() => {
     if(overlay){
      setHide(true)
      document.body.classList.add('no-scroll');
     }else{
      setTimeout(() => {
        setHide(false)
      },500)
      document.body.classList.remove('no-scroll');
     }
  },[overlay])

  return (
    <div className={classNames("overlay",styles.detail,{
      [styles.show]:overlay
     })}>
      <div className={styles['detail-wrapper']}>
        <div className={styles.close} onClick={() => {
           setOverlayShow(false)      
        }}>
          <AliImage src={combineUrl(prefix, `/close.png`)} width={82} height={82} alt="关闭" />
        </div>
        <div className={styles.container} ref={scrolloverlay}>
          <div className={styles.content} >
          {hide && (
            <>
              <div className={styles.title}>
                <h3>{category?.title}</h3>
                <p>{category?.en}</p>
              </div>
              {data && data.map((item, index) => {
                return item.type === 'simple' ?
                  (
                    <div className={styles.group} key={index}>
                      <AliImage src={combineUrl(prefix, `/${item.media?.url}.jpg`)} alt={item.media?.alt} width={item.media?.width} height={item.media?.height} />
                      {Array.isArray(item.text) ?
                        item.text.map((intro,infoIdx) => {
                          return (
                            <div className={styles.intro} key={infoIdx}>
                              <h3>{intro.title}</h3>
                              <p>{divideByElement(intro.content)}</p>
                            </div>
                          )
                        })
                        : (
                          <div className={styles.intro}>
                            <h3>{item.text?.title}</h3>
                            <p>{divideByElement(item.text?.content)}</p>
                          </div>
                        )}

                    </div>
                  ) : item.type === 'slide' ? (
                    <div className={styles.group} key={index}>
                      <Swiper modules={[Navigation]} navigation={true}>
                        {item.slides?.map((slide, index2) => {
                          return (
                            <SwiperSlide key={index2}>
                              <AliImage src={combineUrl(prefix, `/${slide.media?.url}.jpg`)} alt={slide.media.alt} width={slide.media?.width} height={slide.media?.height} />
                              {slide.text && <div className={styles.intro}><h3>{slide.text.title}</h3><p>{slide.text.content}</p></div>}
                            </SwiperSlide>
                          )
                        })}
                      </Swiper>
                      {!Array.isArray(item.text) && <div className={styles.intro}><h3>{item?.text?.title}</h3><p>{divideByElement(item?.text?.content)}</p></div>}
                    </div>
                  ) : null

              })}
            </>
          )}
          <p className={styles.tips}>*产品车型图片和视频仅供参考，实际配置信息以上市销售车辆为准。</p>
        </div>

        </div>
      </div>
    </div>
  );
};

export default ElectraDetail;
