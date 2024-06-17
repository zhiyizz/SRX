import classNames from 'classnames';
import styles from '@styles/century6.module.scss';
import MediaComponent from '@components/MediaComponent';
import type { detailType } from '~types/centruy';

const Quality = ({ prefix, data }: { prefix?: string, data: detailType[] }) => {
  return (
    <div className={styles.quality}>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[0].media!} />
        <div className={classNames(styles.copy,styles.middle)}>
          <h3 className={styles.title}>全新一代智能驱动系统</h3>
          <p>搭载由第八代Ecotec 2.0T可变缸涡轮增压发动机、9速HYDRA-MATIC智能变速箱及48V轻混动系统组成的全新一代智能驱动系统，可实现最大功率174千瓦，峰值扭矩350牛·米，带来舒适平顺的尊享乘坐体验。</p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[1].media!} />
        <div className={classNames(styles.copy,styles.right)}>
          <h3 className={styles.title}>后五连杆独立悬挂</h3>
          <p>五根连杆提供多个方向的控制力，带来更出色的操控稳定性和舒适宁静的驾乘体验。</p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[2].media!} />
        <div className={classNames(styles.copy,styles.right,styles.middle)}>
          <h3 className={styles.title}>全新怀挡式电子换挡系统</h3>
          <p>管柱式造型，灯光面板采用钢琴烤漆面，P档镀铬按键，大气精致，便捷的T型换挡操作，方便安全。</p>
        </div>
      </div>
   
    </div>

  );
};

export default Quality;
