import classNames from 'classnames';
import styles from '@styles/century.module.scss';
import type { detailType } from '~types/centruy';
import { combineUrl } from '@utils/helper';

const Bose = ({ prefix,data }: { prefix?: string,data:detailType[] }) => {
  return (
    <div className={styles.bose}>
      <div className={classNames(styles.group,styles.center)}>
        <div className={styles['video-box']}>
          <video preload="none" poster={`${prefix}/${data[0].media?.poster}`} controls >
            <source src={combineUrl(prefix, data[0].media?.url)} />
          </video>
          <div className={styles.copy}>
            <h3 className={styles.title}>Bose Executive Edition悦尊音响系统</h3>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Bose;
