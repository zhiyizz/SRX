import classNames from 'classnames';
import styles from '@styles/century.module.scss';
import MediaComponent from '@components/MediaComponent';
import type { detailType } from '~types/centruy';

const Internal = ({ prefix,data }: { prefix?: string,data:detailType[] }) => {
  return (
    <div className={styles.internal}>
      <div className={classNames(styles.group,styles.top) }>
        <MediaComponent
          prefix={prefix}
          media={data[0].media!}
        />
        <div className={classNames(styles.copy)}>
          <h3 className={styles.title}>世纪四座私享版</h3>
          <p>
            极致豪华私密空间，通过豪华智慧幕墙为二排乘客提供私密空间，可随心洽谈，于一方天地纵览万千变局。
          </p>
        </div>
      </div>
      <div className={classNames(styles.group,styles.bottom) }>
        <MediaComponent
          prefix={prefix}
          media={data[1].media!}
        />
        <div className={classNames(styles.copy)}>
          <h3 className={styles.title}>世纪四座逸世版</h3>
          <p>
            豪华舒适大空间座舱，从乘坐舒适、触觉舒适、功能舒适和操作舒适多维度打造全方位VIP尊享体验。
          </p>
        </div>
      </div>
    </div>
  )
}

export default Internal
