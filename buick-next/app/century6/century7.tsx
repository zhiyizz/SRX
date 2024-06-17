import classNames from 'classnames';
import styles from '@styles/century6.module.scss';
import { Swiper, SwiperSlide } from "swiper/react"
import Alimage from '@components/AlImage';
import { Navigation } from "swiper"
import type { detailType } from '~types/centruy';

const Century7 = ({ prefix, data }: { prefix?: string, data: detailType[] }) => {
  return (
    <div className={styles.space}>
      <div className={classNames(styles.group,styles.swiperbox)}>
        <Swiper
          navigation={{
            nextEl: ".next1",
            prevEl: ".prev1"
          }}
          loop
          modules={[Navigation]}
          className={styles.swiper}
        >
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[0].slides![0].media.url}`} layout="responsive" width={data[0].slides![0].media.width} height={data[0].slides![0].media.height} alt="" />
          </SwiperSlide>
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[0].slides![1].media.url}`} layout="responsive" width={data[0].slides![1].media.width} height={data[0].slides![1].media.height} alt="" />
          </SwiperSlide>
        </Swiper>
        <div className={styles.navigation}>
          <div className={classNames(styles['swiper-overlay-next'], 'next1')}></div>
          <div className={classNames(styles['swiper-overlay-prev'], 'prev1')}></div>
        </div>
        <div className={styles.copy}>
          <h3 className={styles.title}>七座第三排剧院式座椅</h3>
          <p>新车采用“2+2+3”七座布局，第三排配备多功能电动调节剧院式座椅以更灵活的空间布局和更丰富的使用场景，带来全场景豪华MPV新体验。</p>
        </div>  
      </div>
    </div>

  );
};

export default Century7;
