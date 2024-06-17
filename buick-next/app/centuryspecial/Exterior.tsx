import classNames from 'classnames';
import styles from '@styles/centuryspecial.module.scss';
import MediaComponent from '@components/MediaComponent';
import type { detailType } from '~types/centruy';

const Exterior = ({prefix,data}:{prefix?: string,data:detailType[]}) => {
  return (
      <div className={styles.exterior}>
         <div className={styles.group}>
           <MediaComponent prefix={prefix} media={data[0].media!} />
            <div className={classNames(styles.copy)}>
              <h3 className={styles.title}>箭羽开弓格栅</h3>
              <p>大比例外扩轮廓设计让前脸显得更宽敞，更年轻化；硬朗的横向线条配合层叠分键式的流动光影设计，硬朗而不失优雅，更具科技感；格栅饰条末端造型借鉴箭羽纹样，精工细致，体现“一矢中的”的精准动感。</p>
            </div>
         </div>
         <div className={styles.group}>
           <MediaComponent prefix={prefix} media={data[1].media!} />
            <div className={classNames(styles.copy)}>
              <h3 className={styles.title}>旋羽交互LED大灯</h3>
              <p>61颗LED光源，旋羽造型精致布局,通过激光镭雕工艺，尽显晶莹剔透的水晶质感，以星耀与星悦两种灯语，呈现丰富动态灯光交互，加之8种照明模式，辉映不凡之路。</p>
            </div>
         </div>
         <div className={styles.group}>
           <MediaComponent prefix={prefix} media={data[2].media!} />
            <div className={classNames(styles.copy,styles.right)}>
              <h3 className={styles.title}>贯穿式光翼LED尾灯</h3>
              <p>与头灯造型相呼应，由490颗LED光源组成；旋羽光幕由中间向两边点亮，宛如势能唤醒，开启守护；琥珀色贯穿式转向灯，与车外后视镜前后联动。</p>
            </div>
         </div>
         <div className={styles.group}>
           <MediaComponent prefix={prefix} media={data[3].media!} />
            <div className={classNames(styles.copy,styles.right)}>
              <h3 className={styles.title}>卧金木纹门饰板</h3>
              <p>将金丝嵌绣于木纹之间，于低调中勾勒豪华之感。同时，通过现代几何纹样与深沉木色的搭配，让时尚品位与沉稳底蕴融合兼备于一体。</p> 
            </div>
         </div>
         <div className={styles.group}>
           <MediaComponent prefix={prefix} media={data[4].media!} />
            <div className={classNames(styles.copy,styles.top)}>
              <h3 className={styles.title}>超大全景双天窗</h3>
              <p>双片式超大全景天窗，为乘员带来宽绰明亮的车内空间，同时前后均配备100%遮光率的遮阳帘，足以将严酷高温拒之于车外。</p> 
            </div>
         </div>
      </div>

  );
  
};

export default Exterior;
