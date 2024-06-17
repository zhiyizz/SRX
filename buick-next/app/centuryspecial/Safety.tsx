import classNames from 'classnames';
import styles from '@styles/centuryspecial.module.scss';
import MediaComponent from '@components/MediaComponent';
import type { detailType } from '~types/centruy';

const Safety = ({prefix,data}:{prefix?: string,data:detailType[]})  => {
  return (
    <div className={styles.safety}>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[0].media!} />
        <div className={classNames(styles.copy,styles.right)}>
          <h3 className={styles.title}>eCruise Pro高级智能辅助驾驶</h3>
          <p>通过20个行业领先的感知硬件（包括3个高性能毫米波雷达，以及Mobileye 4代图像识别芯片的前向摄像头），实现LCC车道居中保持、TJA交通拥堵辅助等功能，安全无虞，智控全局。</p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[1].media!} />
        <div className={classNames(styles.copy)}>
          <h3 className={styles.title}>360°高清全景影像</h3>
          <p>360°全景鸟瞰视像，显示四周的真实驾驶环境，并辅以动态引导线，无论行驶还是泊车，令人倍感安心。</p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[2].media!} />
        <div className={classNames(styles.copy)}>
          <h3 className={styles.title}>高清流媒体内后视镜</h3>
          <p>9.3英寸无边框设计，三倍超宽视野，带有摄像头清洁功能，任何情况都确保后方视野清晰可见，提升行车安全。</p>
        </div>
      </div>


    </div>

  );
};

export default Safety;
