import classNames from 'classnames';
import styles from '@styles/century.module.scss';
import MediaComponent from '@components/MediaComponent';
import type { detailType } from '~types/centruy';

const Seat = ({ prefix,data }: { prefix?: string,data:detailType[] }) => {
  {console.log(data)}
  return (
    <div className={styles.seat}>
      <div className={styles.group}>
        <div className={styles['video-box']}>
          <video preload="none" poster={`${prefix}/${data[0].media?.poster}`} controls>
            <source src={`${prefix}/${data[0].media?.url}`} />
          </video>
          <div className={styles.copy}>
            <h3 className={styles.title}>160度云感座椅</h3>
          </div>
          <div className={styles.arrow}><i></i><i></i><i></i></div>
        </div>
      </div>
      <div className={classNames(styles.group,styles['group-1'])}>
        <MediaComponent prefix={prefix} media={data[1].media!} />
          <div className={classNames(styles.copy,styles.right,styles.top)}>
            <h3 className={styles.title}>18向分区体感调节功能：</h3>
            <ul className={styles.list}>
              <li>4向电动调节头枕</li>
              <li>2向电动调节颈枕</li>
              <li>4向电动腰托调节</li>
              <li>160度超大椅背倾斜</li>
              <li>可延伸式电动腿托和<br />电动翻展式脚踏</li>
            </ul>
          </div>
          <p className={styles.pos}>
            18点分区指感按摩，将豪华SPA搬入车中
            18点按摩功能+9大按摩模式+3档按摩力度 <br /><br />
            5大热感分区，温暖如影随形
            颈托、坐垫/靠背、腿托/脚踏均可分区加热。
            其中颈托和脚踏均为石墨烯加热，均衡制暖<br /><br />
            4项一键奢享联动模式，舒适随心而设
            舒适坐姿、休憩坐姿、仰卧坐姿、入眠模式<br /><br />
            一键设置常用坐姿
            三档通风，三档位置记忆功能
          </p>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[2].media!} />
        <div className={classNames(styles.copy,styles.middle)}>
          <h3 className={styles.title}>柔光阅读灯</h3>
          <p>创新式阅读灯集成于头枕，触摸式设计，打开全新阅读体验。</p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[3].media!} />
        <div className={classNames(styles.copy)}>
          <h3 className={styles.title}>第二排柔光化妆镜</h3>
          <p>在二排乘客触手可及的地方，配备LED照明灯的柔光化妆镜。</p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[4].media!} />
        <div className={classNames(styles.copy,styles.right)}>
          <h3 className={styles.title}>第二排一键升降遮阳帘</h3>
          <p>带防夹和电动一键升降功能，帘布的遮阳率达到72%，更为密致的孔结设计，优化外观的同时进一步降低了透光率。 </p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[5].media!} />
        <div className={classNames(styles.copy,styles.right)}>
          <h3 className={styles.title}>抽屉式中央储物箱</h3>
          <p>设于两个座椅中间，采用植绒材质，使用便捷，质感豪华。</p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[6].media!} />
        <div className={classNames(styles.copy,styles.right)}>
          <h3 className={styles.title}>手机无线充电<span className={styles.text}>＆</span>杯托</h3>
          <p>在二排乘客触手可及处，配备USB和座椅物理调节按钮、升降式杯托、手机无线充电、软质拉手，以尊崇礼遇，热诚款待。</p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[7].media!} />
        <div className={classNames(styles.copy)}>
          <h3 className={styles.title}>头枕内置双超近场扬声器</h3>
          <p>Bose全球首款后排奢华音响系统，搭配双超强空间感全新一代Bose UltraNearfield 超近场头枕扬声器辅以PersonalSpace®虚拟音频技术，有效提升后排聆听者的氛围感和临场感，在耳畔呈现一场流动的音乐盛宴。</p>
        </div>
      </div>
    </div>

  );
};

export default Seat;
