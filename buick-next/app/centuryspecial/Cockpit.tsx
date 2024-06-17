import classNames from 'classnames';
import styles from '@styles/centuryspecial.module.scss';
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import MediaComponent from '@components/MediaComponent';
import Alimage from '@components/AlImage';
import type { detailType } from '~types/centruy';

const Cockpit = ({prefix,data}:{prefix?: string,data:detailType[]}) => {
  return (
    <div className={styles.cockpit}>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[0].media!} />
        <div className={classNames(styles.copy)}>
          <h3 className={styles.title}>EYEMAX 30吋一体弧面6K屏</h3>
          <p>采用一体式设计，6K超高分辨率和10亿种色彩呈现，带来细腻逼真的视觉体验；搭载高通旗舰级8155芯片，赋予极致流畅的操作体验。</p>
        </div>

      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[1].media!} />
        <div className={classNames(styles.copy,styles.right)}>
          <h3 className={styles.title}>高通骁龙8155芯片</h3>
          <p>高通骁龙8155芯片，体积更小、带宽更大、功耗更低、性能更强，CPU算力高达105K DMIPS，操作体验如行云流水。</p>
        </div>
      </div>
      <div className={classNames(styles.group,styles['group-3'],styles.swiperbox)}>
        <div className={styles.head}>
          <h3 className={styles.title}>eConnect 互联技术</h3>
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
            <Alimage src={`${prefix}/${data[2].slides![0].media.url}`} layout="responsive" width={data[2].slides![0].media.width} height={data[2].slides![0].media.height} alt="" />
          </SwiperSlide>
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[2].slides![1].media.url}`} layout="responsive" width={data[2].slides![1].media.width} height={data[2].slides![1].media.height} alt="" />
          </SwiperSlide>
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[2].slides![2].media.url}`} layout="responsive" width={data[2].slides![2].media.width} height={data[2].slides![2].media.height} alt="" />
          </SwiperSlide>
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[2].slides![3].media.url}`} layout="responsive" width={data[2].slides![3].media.width} height={data[2].slides![3].media.height} alt="" />
          </SwiperSlide>
        </Swiper>
        <div className={styles.navigation}>
          <div className={classNames(styles['swiper-overlay-next'], 'next1')}></div>
          <div className={classNames(styles['swiper-overlay-prev'], 'prev1')}></div>
        </div>

        <div className={classNames(styles.copy)}>
          <h3 className={styles.title}>四种仪表模式</h3>
          <p>创新搭载四种仪表盘交互模式，包括标准仪表模式、地图模式、驾驶辅助模式、极简模式，适配不同出行场景，令每一程旅途都释放独特个性。</p>
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
          <Alimage src={`${prefix}/${data[3].slides![0].media.url}`} layout="responsive" width={data[3].slides![0].media.width} height={data[3].slides![0].media.height} alt="" />
          <div className={classNames(styles.copy)}>
            <h3 className={styles.title}>个性化主页</h3>
            <p>智能座舱系统主页采用多应用、卡片式、自由搭配的界面设计。用户可以根据自己的使用习惯，将常用功能展示在卡片最前端，减少操作步骤，以智能成就“零层级”互动，让理想旅途一触即发。</p>
          </div>
        </SwiperSlide>
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[3].slides![1].media.url}`} layout="responsive" width={data[3].slides![1].media.width} height={data[3].slides![1].media.height} alt="" />
            <div className={classNames(styles.copy)}>
              <h3 className={styles.title}>3D动态车模</h3>
              <p>基于车型的颜色、配置，打造逼真渲染的3D动态车模，置入车内仪表和中控区，用户通过车模实时高效控制车辆状态、进行车况查询，实现精准而直观的可视化驾控体验，让眼前所见，即是真实所现。</p>
            </div>
          </SwiperSlide>
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[3].slides![2].media.url}`} layout="responsive" width={data[3].slides![2].media.width} height={data[3].slides![2].media.height} alt="" />
            <div className={classNames(styles.copy)}>
              <h3 className={styles.title}>多种手势操作</h3>
              <p>搭配多种快捷手势。任意界面下拉快捷操作入口，直达搜索、行车功能快捷控制、消息提醒等功能。多指抓屏，秒回主界面。无需层层翻页，便捷一触即达。</p>
            </div>
          </SwiperSlide>
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[3].slides![3].media.url}`} layout="responsive" width={data[3].slides![3].media.width} height={data[3].slides![3].media.height} alt="" />
            <div className={classNames(styles.copy)}>
              <h3 className={styles.title}>个性化场景引擎</h3>
              <p>系统可主动根据场景变化为车主提供服务引导，实现基于位置、时间、天气、个人标签等多种维度的大数据分析能力，自动判断场景，提供与出行、娱乐、生活服务有关的多样化服务内容。</p>
            </div>
          </SwiperSlide>
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[3].slides![4].media.url}`} layout="responsive" width={data[3].slides![4].media.width} height={data[3].slides![4].media.height} alt="" />
            <div className={classNames(styles.copy)}>
              <h3 className={styles.title}>整车级OTA远程升级</h3>
              <p>支持超过40个模块进行并行刷新。用户可对车辆下达执行OTA更新或预约更新的指令，用户亦可通过手机App接收车辆OTA更新通知，让车机系统利用闲暇时间安装更新，无需在车内操作等待。</p>
            </div>
          </SwiperSlide>
          <SwiperSlide  >
            <Alimage src={`${prefix}/${data[3].slides![5].media.url}`} layout="responsive" width={data[3].slides![5].media.width} height={data[3].slides![5].media.height} alt="" />
            <div className={classNames(styles.copy)}>
              <h3 className={styles.title}>无线Apple CarPlay 智能手机映射</h3>
              <p>支持无线Apple CarPlay 智能手机映射，可将导航、音乐等直接展示至车机大屏，满足手机与车辆的互联需求。</p>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className={styles.navigation}>
          <div className={classNames(styles['swiper-overlay-next'], 'next2')}></div>
          <div className={classNames(styles['swiper-overlay-prev'], 'prev2')}></div>
        </div>
      </div>
      <div className={classNames(styles.group,styles['group-5'])}>
        <MediaComponent prefix={prefix} media={data[4].media!} />
        <div className={classNames(styles.copy)}>
          <h3 className={styles.title}>头等舱模式</h3>
          <p>持续更新可替换的壁纸主题和开机动画，让用户不仅可以根据不同时节、用车场景、心情，设置专属自己的个性化壁纸与主题，更能在特殊纪念日，为关心的人打造特别的开机仪式，让彩蛋般的惊喜，开启一段美好旅程。</p>
        </div>
      </div>
    </div>

  );
};

export default Cockpit;
