import classNames from 'classnames';
import styles from '@styles/century.module.scss';
import MediaComponent from '@components/MediaComponent';
import type { detailType } from '~types/centruy';

const Tech = ({ prefix,data }: { prefix?: string,data:detailType[] }) => {
  return (
    <div className={styles.tech}>
    
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[0].media!} />
        <div className={classNames(styles.copy,styles.center)}>
          <h3 className={styles.title}>5mm双层声学玻璃</h3>
          <p>前挡风玻璃、前三角窗、前门玻璃、滑移门玻璃均采用5mm声学夹层，有效阻隔风噪。</p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[1].media!} />
        <div className={classNames(styles.copy,styles.center )}>
          <h3 className={styles.title}>Bose ANC主动降噪技术</h3>
          <p>通过车舱顶衬的特定区域安装的4个麦克风，随时监测与收集发动机噪音，搭配噪音补偿技术，通过扬声器释放与发动机噪音相反的声波，以此有效抵消噪音。</p>
        </div>
      </div>
    </div>

  );
};

export default Tech;
