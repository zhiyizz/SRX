import classNames from 'classnames';
import styles from '@styles/century.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import MediaComponent from '@components/MediaComponent';
import Alimage from '@components/AlImage';
import type { detailType } from '~types/centruy';

const Cockpit = ({ prefix,data }: { prefix?: string,data:detailType[] }) => {
  return (
    <div className={styles.cockpit}>
      <div className={styles.group}>
        <div className={styles['video-box']}>
          <video preload="none" poster={`${prefix}/${data[0].media?.poster}`} controls>
            <source src={`${prefix}/${data[0].media?.url}`} />
          </video>
          <div className={styles.copy}>
            <h3 className={styles.title}>全新一代VCS智能座舱</h3>
          </div>
          <div className={styles.arrow}><i></i><i></i><i></i></div>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[1].media!} />
        <div className={classNames(styles.copy)}>
          <h3 className={styles.title}>EYEMAX 30吋一体弧面6K屏</h3>
          <p>采用一体式设计，6K超高分辨率和10亿种色彩呈现，带来细腻逼真的视觉体验；搭载高通旗舰级8155芯片，赋予极致流畅的操作体验。</p>
        </div>

      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[2].media!} />
        <div className={classNames(styles.copy,styles.right)}>
          <h3 className={styles.title}>双车规级旗舰高通骁龙8155芯片</h3>
          <p>世纪采用两颗车规级旗舰高通骁龙8155芯片，其中一颗用于前排座舱，另一颗则专供后舱使用。高通晓龙8155芯片，体积更小、带宽更大、功耗更低、性能更强，CPU算力高达105K DMIPS，操作体验如行云流水。</p>
        </div>
      </div>
      <div className={classNames(styles.group,styles['group-3'],styles.swiperbox)}>
        <div className={styles.head}>
        <h3 className={styles.title}>eConnect互联技术</h3>
        <p>别克独有的智慧互联系统，将智能设备与车辆紧密相连，并基于EYEMAX 30吋一体弧面6K屏，实现更具个性化的界面设计与信息排布，高效展示车辆及驾控信息，提升操作便捷性与行车安全性。</p>
    
        </div>
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
            <Alimage src={`${prefix}/${data[3].slides![0].media.url}`} layout="responsive" width={data[3].slides![0].media?.width} height={data[3].slides![0].media?.height} alt="" />
            <div className={classNames(styles.copy)}>
              <h3 className={styles.title}>头等舱模式</h3>
              <p>持续更新可替换的壁纸主题和开机动画，让用户不仅可以根据不同时节、用车场景、心情，设置专属自己的个性化壁纸与主题，更能在特殊纪念日，为关心的人打造特别的开机仪式，让彩蛋般的惊喜，开启一段美好旅程。</p>
            </div>
          </SwiperSlide>
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[3].slides![1].media.url}`} layout="responsive" width={data[3].slides![1].media?.width} height={data[3].slides![1].media?.height} alt="" />
            <div className={classNames(styles.copy)}>
              <h3 className={styles.title}>多仪表显示模式</h3>
              <p>创新搭载四种仪表盘交互模式，包括标准仪表模式、地图模式、驾驶辅助模式、极简模式，适配不同出行场景，令每一程旅途都释放独特个性。</p>
            </div>
          </SwiperSlide>
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[3].slides![2].media.url}`} layout="responsive" width={data[3].slides![2].media?.width} height={data[3].slides![2].media?.height} alt="" />
            <div className={classNames(styles.copy)}>
              <h3 className={styles.title}>多仪表显示模式</h3>
              <p>创新搭载四种仪表盘交互模式，包括标准仪表模式、地图模式、驾驶辅助模式、极简模式，适配不同出行场景，令每一程旅途都释放独特个性。</p>
            </div>
          </SwiperSlide>
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[3].slides![3].media.url}`} layout="responsive" width={data[3].slides![3].media?.width} height={data[3].slides![3].media?.height} alt="" />
            <div className={classNames(styles.copy)}>
              <h3 className={styles.title}>多仪表显示模式</h3>
              <p>创新搭载四种仪表盘交互模式，包括标准仪表模式、地图模式、驾驶辅助模式、极简模式，适配不同出行场景，令每一程旅途都释放独特个性。</p>
            </div>
          </SwiperSlide>
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[3].slides![4].media.url}`} layout="responsive" width={data[3].slides![4].media?.width} height={data[3].slides![4].media?.height} alt="" />
            <div className={classNames(styles.copy)}>
              <h3 className={styles.title}>多仪表显示模式</h3>
              <p>创新搭载四种仪表盘交互模式，包括标准仪表模式、地图模式、驾驶辅助模式、极简模式，适配不同出行场景，令每一程旅途都释放独特个性。</p>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className={styles.navigation}>
          <div className={classNames(styles['swiper-overlay-next'], 'next1')}></div>
          <div className={classNames(styles['swiper-overlay-prev'], 'prev1')}></div>
        </div>

      </div>
      <div className={classNames(styles.group,styles['group-4'],styles.swiperbox)}>
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
            <Alimage src={`${prefix}/${data[4].slides![0].media.url}`} layout="responsive" width={data[4].slides![0].media?.width} height={data[4].slides![0].media?.height} alt="" />
            <div className={classNames(styles.copy)}>
              <h3 className={styles.title}>个性化主页</h3>
              <p>智能座舱系统主页采用多应用、卡片式、自由搭配的界面设计。用户可以根据自己的使用习惯，将常用功能展示在卡片最前端，减少操作步骤，以智能成就“零层级”互动，让理想旅途一触即发。</p>
            </div>
          </SwiperSlide>
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[4].slides![1].media.url}`} layout="responsive" width={data[4].slides![1].media?.width} height={data[4].slides![1].media?.height} alt="" />
            <div className={classNames(styles.copy)}>
              <h3 className={styles.title}>多种手势操作</h3>
              <p>搭配多种快捷手势。任意界面下拉快捷操作入口，直达搜索、行车功能快捷控制、消息提醒等功能。多指抓屏，秒回主界面。无需层层翻页，便捷一触即达。</p>
            </div>
          </SwiperSlide>
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[4].slides![2].media.url}`} layout="responsive" width={data[4].slides![2].media?.width} height={data[4].slides![2].media?.height} alt="" />
            <div className={classNames(styles.copy)}>
              <h3 className={styles.title}>整车级OTA远程升级</h3>
              <p>支持超过40个模块进行并行刷新。用户可对车辆下达执行OTA更新或预约更新的指令，用户亦可通过手机App接收车辆OTA更新通知，让车机系统利用闲暇时间安装更新，无需在车内操作等待。</p>
            </div>
          </SwiperSlide>
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[4].slides![3].media.url}`} layout="responsive" width={data[4].slides![3].media?.width} height={data[4].slides![3].media?.height} alt="" />
            <div className={classNames(styles.copy)}>
              <h3 className={styles.title}>无线Apple CarPlay 智能手机映射</h3>
              <p>支持无线Apple CarPlay 智能手机映射，可将导航、音乐等直接展示至车机大屏，满足手机与车辆的互联需求。</p>

            </div>
          </SwiperSlide>
          <p className={styles.tips}>*所示图片仅供展示广告创意，产品效果（包括但不限于：外观、内饰、颜色等）请以实物为准。随着对产品的持续优化升级，详细配置、功能及数据均有可能有所变化，具体产品配置信息以中国大陆地区实际上市销售车辆为准。</p>
        </Swiper>
        
        <div className={styles.navigation}>
          <div className={classNames(styles['swiper-overlay-next'], 'next2')}></div>
          <div className={classNames(styles['swiper-overlay-prev'], 'prev2')}></div>
        </div>
      
      </div>
    </div>

  );
};

export default Cockpit;
