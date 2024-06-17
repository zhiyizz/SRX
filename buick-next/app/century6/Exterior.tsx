import classNames from 'classnames';
import styles from '@styles/century6.module.scss';
import MediaComponent from '@components/MediaComponent';
import type { detailType } from '~types/centruy';

const Exterior = ({ prefix, data }: { prefix?: string, data: detailType[] }) => {
  return (
    <div className={styles.exterior}>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[0].media!} />
        <div className={classNames(styles.copy, styles.center)}>
          <h3 className={styles.title}>律动波纹格栅</h3>
          <p>大胆采用精巧稳重的檐瓦造型，格栅更宽更大，体量感增大；同时结合现代的参数化设计，雕刻出超越想象的工艺细节；在格网转折与高亮镀铬装饰的映衬下，不仅显露出向外侧扩展的动势，豪华气息亦扑面而来。</p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[1].media!} />
        <div className={classNames(styles.copy)}>
          <h3 className={styles.title}>光迹交互LED大灯</h3>
          <p>90颗LED光源，通过激光镭雕工艺，尽显晶莹剔透的水晶质感。以星耀与星悦两种灯语，呈现丰富动态灯光交互，加之8种照明模式，辉映不凡之路。</p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[2].media!} />
        <div className={classNames(styles.copy, styles.center)}>
          <h3 className={styles.title}>贯穿式浮光LED尾灯</h3>
          <p>与头灯造型呼应，由730颗LED光源组成了尾灯光幕。由中间向外侧点亮，有节奏感地唤醒势能。光影交相辉映，尽展奢华风度。</p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[3].media!} />
        <div className={classNames(styles.copy)}>
          <h3 className={styles.title}>对置式光感门把手</h3>
          <p>配备具有迎宾功能的门把手LED灯带，与流光礼宾灯光秀相呼应，打造全方位礼宾视觉体验。</p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[4].media!} />
        <div className={classNames(styles.copy, styles.center)}>
          <h3 className={styles.title}>银翼光毯</h3>
          <p>伴随电动滑移门缓缓开启，一场感官之旅向前铺展。2.5米光幕地毯，搭配自带光芒的迎宾踏板。雅致流光，彰显至臻款待之道。</p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[5].media!} />
        <div className={classNames(styles.copy)}>
          <h3 className={styles.title}>背光氛围灯</h3>
          <p>90颗LED灯珠形成422个星点环抱座舱，以山水流光为灵感，采用三级漫反射出光模式，带来沉浸式光影体验。</p>
        </div>
      </div>
      <div className={styles.group}>
        <MediaComponent prefix={prefix} media={data[6].media!} />
        <div className={classNames(styles.copy, styles.middle, styles.right)}>
          <h3 className={styles.title}>超大全景双天窗+128色动态氛围灯</h3>
          <p>双片式超大全景天窗，为乘员带来宽绰明亮的车内空间，同时前后均配备100%遮光率的遮阳帘，足以将严酷高温拒之于车外。搭配128色动态环境氛围灯，将自然山水等元素运用配合动态氛围灯贯穿整个内饰。环境氛围灯能实现128种颜色的无极联调以及亮度调节，营造出沉浸式的动态光影。</p>
        </div>
      </div>
    </div>

  );

};

export default Exterior;
