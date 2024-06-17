import classNames from 'classnames';
import styles from '@styles/century6.module.scss';
import type { detailType } from '~types/centruy';

const Health = ({ prefix, data }: { prefix?: string, data: detailType[] }) => {
  return (
    <div className={styles.health}>
      <div className={classNames(styles.group,styles.center)}>
        <div className={styles['video-box']}>
          <video preload="none" poster={`${prefix}/${data[0].media?.poster}`} controls>
            <source src={`${prefix}/${data[0].media?.url}`} />
          </video>
          <div className={styles.copy}>
            <h3 className={styles.title}>BioCare智能生物净舱系统</h3>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Health;
