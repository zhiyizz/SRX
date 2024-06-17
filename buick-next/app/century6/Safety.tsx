import classNames from 'classnames';
import styles from '@styles/century6.module.scss';
import MediaComponent from '@components/MediaComponent';
import type { detailType } from '~types/centruy';

const Safety = ({ prefix, data }: { prefix?: string, data: detailType[] }) => {
  return (
    <div className={styles.safety}>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[0].media!} />
        <div className={classNames(styles.copy)}>
          <h3 className={styles.title}>eCruise Pro高级智能辅助驾驶</h3>
          <p>通过22个行业领先的感知硬件（包括5个高性能毫米波雷达，以及Mobileye 4代图像识别芯片的前向摄像头），实现全场景ILC指令变道辅助、LCC车道居中保持、TJA交通拥堵辅助等功能，安全无虞，智控全局。</p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[1].media!} />
        <div className={classNames(styles.copy,styles.right)}>
          <h3 className={styles.title}>SRP遥控泊车辅助系统</h3>
          <p>支持在车外通过智能钥匙或手机APP遥控车辆，实现多场景自动泊车，有效解决狭小车位空间或车旁积水等不便情况，以智慧科技驾享自由。</p>
        </div>
      </div>
      <div className={classNames(styles.group,styles['group-3'])}>
        <MediaComponent prefix={prefix} media={data[2].media!} />
        <div className={classNames(styles.copy,styles.right)}>
          <h3 className={styles.title}>APA全场景智能泊车系统</h3>
          <p>采用视觉和超声波雷达双重感知硬件融合的泊车方案，能够更好地识别车辆、行人、车位线及特殊障碍物等，支持水平/垂直/斜列车位的自动泊车，实现多场景和多种复杂停车环境下的智能泊车。用户可通过中控屏选择自动泊车，也可通过手机或遥控钥匙在车外进行遥控泊入泊出。</p>
        </div>
      </div>
      <div className={classNames(styles.group,styles['group-4'])}>
        <MediaComponent prefix={prefix} media={data[3].media!} />
         <div className={classNames(styles.copy,styles.nop)}>
          <h3 className={styles.title}>智慧领航Navigation on Pilot(NOP)*</h3>
          <p>可以按照用户设定的导航路线，在满足开启条件的高精度地图覆盖路段内实现驾驶辅助，让出行和驾驶体验更加轻松惬意。</p>
          <p className={styles.tips}>*世纪对L2+级别的智能辅助驾驶功能进行了硬件预埋，如智慧领航Navigation on Pilot(NOP)，后续将陆续通过远程更新等方式进行功能开启。</p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[5].media!} />
        <div className={classNames(styles.copy,styles.center)}>
          <h3 className={styles.title}>HUD抬头显示功能</h3>
          <p>12.6英寸风挡式全彩高清抬头显示，根据环境光自动调节亮度，在强光下也清晰，使驾驶者目光无需离开前方路面，提高行车安全性。<br />同时，四种HUD视图模式可选，还可与仪表视图联动，包括导航模式、驾驶辅助模式、极简模式和媒体模式。</p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[6].media!} />
        <div className={classNames(styles.copy)}>
          <h3 className={styles.title}>360<span className={styles.text}>°</span> 高清全景影像</h3>
          <p>360<span className={styles.text}>°</span>全景鸟瞰视像，显示四周的真实驾驶环境，并辅以动态引导线，无论行驶还是泊车，令人倍感安心。</p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[7].media!} />
        <div className={classNames(styles.copy)}>
          <h3 className={styles.title}>高清流媒体内后视镜</h3>
          <p>9.3英寸无边框设计，三倍超宽视野，带有摄像头清洁功能，任何情况都确保后方视野清晰可见，提升行车安全。</p>
        </div>
      </div>


    </div>

  );
};

export default Safety;
