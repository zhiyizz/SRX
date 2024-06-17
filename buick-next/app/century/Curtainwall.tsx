import type { detailType } from '~types/centruy';
import classNames from 'classnames';
import styles from '@styles/century.module.scss';
import MediaComponent from '@components/MediaComponent';
import { Swiper, SwiperSlide } from 'swiper/react';
import Alimage from '@components/AlImage';
import { Navigation } from 'swiper';

const Curtainwall = ({ prefix,data }: { prefix?: string,data:detailType[] }) => {
  console.log(data);
  return (
    <div className={styles.curtainwall}>
      
      <div className={styles.group}>
        <div className={styles['video-box']}>
          <video preload="none" poster={`${prefix}/${data[0].media?.poster}`} controls>
            <source src={`${prefix}/${data[0].media?.url}`} />
          </video>
          <div className={styles.copy}>
            <h3 className={styles.title}>豪华智慧幕墙系统</h3>
          </div>
          <div className={styles.arrow}><i></i><i></i><i></i></div>
        </div>
      </div>
      <div className={classNames(styles.group,styles['group-1'])}>
        <Swiper
          navigation={{
            nextEl: ".next1",
            prevEl: ".prev1"
          }}
          loop
          modules={[Navigation]}
          className={styles.swiper}
        >
          {data[1].slides?.map((item,index) => (
            <SwiperSlide key={index}>
              <Alimage src={`${prefix}/${item.media.url}`} layout="responsive" width={item.media.width} height={item.media.height} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.navigation}>
          <div className={classNames(styles['swiper-overlay-next'], 'next1')}></div>
          <div className={classNames(styles['swiper-overlay-prev'], 'prev1')}></div>
        </div>
        <div className={classNames(styles.copy,'pc')}>
          <h3 className={styles.title}>32吋可升降智能屏</h3>
          <p>自由营造视觉娱乐感官盛宴，随心切换尽享旅途。<br />
            具备升降及防夹功能，全屏升起时营造后排私享空间，下降半屏轻松交流，<br />
            同时，半屏播放不中断，便捷随心。<br />
            配备前车实况、投屏、沙发管家 （电视应用市场，可下载主流视频APP）、<br />
           投屏、音乐、视频等功能。<br />
            丰富功能触手可及，从容体验豪华视界。</p>
        </div>
        <div className={classNames(styles.copy,'m')}>
          <h3 className={styles.title}>32吋可升降智能屏</h3>
          <p>自由营造视觉娱乐感官盛宴，随心切换尽享旅途。
            具备升降及防夹功能，全屏升起时营造后排私享空间，下降半屏轻松交流，
            同时，半屏播放不中断，便捷随心。
            配备前车实况、投屏、沙发管家（电视应用市场，可下载主流视频APP）、投屏、音乐、视频等功能。
            丰富功能触手可及，从容体验豪华视界。</p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[2].media!} />
        <div className={classNames(styles.copy,styles.left)}>
          <h3 className={styles.title}>8吋时钟显示屏</h3>
          <p>独立8吋时钟显示屏，双主题模式（表盘、数字）为你获悉日期与时间。令分秒，尽在掌握。</p>
        </div>

      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[3].media!} />
        <div className={classNames(styles.copy,styles.left)}>
          <h3 className={styles.title}>13L礼宾冰箱</h3>
          <p>13L大容量车载冰箱，精准将温度控制在-6至10度之间，满足长途制冷与保温需求。让珍藏的美酒时刻保持在适宜饮用温度，旅途中的每一段美妙时光，总有佳酿相伴。</p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[4].media!} />
        <div className={classNames(styles.copy,styles.right)}>
          <h3 className={styles.title}>弹出式豪华储物箱</h3>
          <p>隔断配备左右两个8L大容量弹出式植绒储物箱，可存放低帮鞋、手包等。功能与便利齐具 ，坐享舒适体验。 </p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[5].media!} />
        <div className={classNames(styles.copy)}>
          <h3 className={styles.title}>扩香盒</h3>
          <p>空调出风口两侧布有可放置香片的特制香氛盒，让香气与旅途始终相随。点缀心境旅途，予你一段曼妙感官奢宠盛宴。</p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[6].media!} />
        <div className={classNames(styles.copy)}>
          <h3 className={styles.title}>Cabin talk前后舱对讲系统</h3>
          <p>当座舱幕墙处于完全升起的状态时，前排可通过方向盘控制按键，与后排实时通话；二排坐乘者也可以使用中央触控屏前端的按键激活对讲系统，实现前后排双向通话。</p>
        </div>
      </div>
    </div>

  );
};

export default Curtainwall;
