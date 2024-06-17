import classNames from 'classnames';
import styles from '@styles/century6.module.scss';
import MediaComponent from '@components/MediaComponent';
import { Swiper, SwiperSlide } from "swiper/react"
import Alimage from '@components/AlImage';
import { Navigation } from "swiper"
import type { detailType } from '~types/centruy';

const Space = ({ prefix, data }: { prefix?: string, data: detailType[] }) => {
  return (
    <div className={styles.space}>
      <div className={styles.group}>
        <div className={styles['video-box']}>
          <video preload="none" poster={`${prefix}/${data[0].media?.poster}`} controls>
            <source src={`${prefix}/${data[0].media?.url}`} />
          </video>
          <div className={styles.copy}>
            <h3 className={styles.title}>7项一键奢享座椅联动模式</h3>
          </div>
          <div className={styles.arrow}><i></i><i></i><i></i></div>
        </div>
      </div>
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
            <Alimage src={`${prefix}/${data[1].slides![0].media.url}`} layout="responsive" width={data[1].slides![0].media.width} height={data[1].slides![0].media.height} alt="" />
          </SwiperSlide>
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[1].slides![1].media.url}`} layout="responsive" width={data[1].slides![1].media.width} height={data[1].slides![1].media.height} alt="" />
          </SwiperSlide>
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[1].slides![2].media.url}`} layout="responsive" width={data[1].slides![2].media.width} height={data[1].slides![2].media.height} alt="" />
          </SwiperSlide>
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[1].slides![3].media.url}`} layout="responsive" width={data[1].slides![3].media.width} height={data[1].slides![3].media.height} alt="" />
          </SwiperSlide>
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[1].slides![4].media.url}`} layout="responsive" width={data[1].slides![4].media.width} height={data[1].slides![4].media.height} alt="" />
          </SwiperSlide>
        </Swiper>
        <div className={styles.navigation}>
          <div className={classNames(styles['swiper-overlay-next'], 'next1')}></div>
          <div className={classNames(styles['swiper-overlay-prev'], 'prev1')}></div>
        </div>
        <div className={styles.copy}>
          <h3 className={styles.title}>7项一键奢享座椅联动模式</h3>
          <p>
          6座/7座蕴世版专享7项一键座椅联动模式，<br />
          完美满足所有出行场景需求，<br />
          灵活掌控座舱空间，<br />
          让每位乘坐者都能在其间舒享自在。
          </p>
        </div>  
      </div>
      <div className={classNames(styles.group,styles.swiperbox)}>
        <Swiper
          navigation={{
            nextEl: ".next2",
            prevEl: ".prev2"
          }}
          loop
          modules={[Navigation]}
          className={styles.swiper}
        >
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[2].slides![0].media.url}`} layout="responsive" width={data[2].slides![0].media.width} height={data[1].slides![0].media.height} alt="" />
          </SwiperSlide>
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[2].slides![1].media.url}`} layout="responsive" width={data[2].slides![1].media.width} height={data[1].slides![1].media.height} alt="" />
          </SwiperSlide>
        </Swiper>
        <div className={styles.navigation}>
          <div className={classNames(styles['swiper-overlay-next'], 'next2')}></div>
          <div className={classNames(styles['swiper-overlay-prev'], 'prev2')}></div>
        </div>
        <div className={styles.copy}>
          <h3 className={styles.title}>后备箱空间</h3>
          <p>后备箱容积高达612升，7座版更可扩容至1901升，纵深可达1112mm，不论是长途旅行还是多人高尔夫聚会，都有充足空间。</p>
        </div>  
      </div>
      <div className={classNames(styles.group,styles.swiperbox)}>
        <Swiper
          navigation={{
            nextEl: ".next3",
            prevEl: ".prev3"
          }}
          loop
          modules={[Navigation]}
          className={styles.swiper}
        >
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[3].slides![0].media.url}`} layout="responsive" width={data[3].slides![0].media.width} height={data[3].slides![0].media.height} alt="" />
          </SwiperSlide>
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[3].slides![1].media.url}`} layout="responsive" width={data[3].slides![1].media.width} height={data[3].slides![1].media.height} alt="" />
          </SwiperSlide>
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[3].slides![2].media.url}`} layout="responsive" width={data[3].slides![2].media.width} height={data[3].slides![2].media.height} alt="" />
          </SwiperSlide>
        </Swiper>
        <div className={styles.navigation}>
          <div className={classNames(styles['swiper-overlay-next'], 'next3')}></div>
          <div className={classNames(styles['swiper-overlay-prev'], 'prev3')}></div>
        </div>
        <div className={styles.copy}>
          <h3 className={styles.title}>37处储物空间</h3>
          <p>7座蕴世版拥有37处储物空间，整个座舱拥有8个杯托，3个带有无线充电功能的手机槽，
            随手取放，多处储物空间采用植绒材质，凸显高档感。</p>
          <p className={styles.tips}> <i>*</i>6座为36处储物空间</p>
        </div>  
      </div>
      <div className={styles.group}>
          <MediaComponent prefix={prefix} media={data[4].media!} />
          <div className={classNames(styles.copy)}>
            <h3 className={styles.title}>4.3L中央扶手冰箱</h3>
            <p>采用德国直流变频压缩机，在常温环境下，20分钟内可降至-6℃，通过按键开关控制+屏幕显示，能够精确控制-6℃ ~ 10℃范围的温度调节，让各类饮品伴随旅途。</p> 
          </div>
        </div>
        <div className={styles.group}>
          <MediaComponent prefix={prefix}  media={data[5].media!} />
          <div className={classNames(styles.copy,styles.right)}>
            <h3 className={styles.title}>豪华翻折小桌板</h3>
            <p>为二排座椅配备的独立小桌板，轻触开启按钮，阻尼设计平顺舒适；哑光镀铬饰条简约雅致，打孔皮质桌面触感柔和，也实现良好的防滑功能。</p> 
          </div>
        </div>

    </div>

  );
};

export default Space;
