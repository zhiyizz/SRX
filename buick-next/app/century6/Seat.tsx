import classNames from 'classnames';
import styles from '@styles/century6.module.scss';
import MediaComponent from '@components/MediaComponent';
import type { detailType } from '~types/centruy';

const Seat =  ({ prefix, data }: { prefix?: string, data: detailType[] })  => {
  return (
    <div className={styles.seat}>
    
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[0].media!} />
        <div className={classNames(styles.copy,styles.right)}>
          <h3 className={styles.title}>第二排一键升降遮阳帘</h3>
          <p>带防夹和电动一键升降功能，帘布的遮阳率达到72%，更为密致的孔结设计，优化外观的同时进一步降低了透光率。</p>
        </div>
      </div>
    </div>

  );
};

export default Seat;
