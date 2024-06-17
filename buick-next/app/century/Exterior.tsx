import type { detailType } from '~types/centruy';
import classNames from 'classnames';
import styles from '@styles/century.module.scss';
import MediaComponent from '@components/MediaComponent';

const Exterior = ({prefix,data}:{prefix?: string,data:detailType[]}) => {
  return (
      <div className={styles.exterior}>
        <div className={styles.group}>
           <MediaComponent prefix={prefix} media={data[0].media!} />
            <div className={classNames(styles.copy)}>
              <h3 className={styles.title}>关山飞雪双色车身</h3>
              <p>四座私享版采用关山飞雪双色车身设计，在光影变幻之间，折射出瑰丽气息与尊贵气度。上侧的银色让光影变化更显巧妙灵气，彰显现代格调；下侧为历经时光沉淀、国宝般质感的青绿色，表达了永恒的绚丽和深沉。</p>
            </div>
         </div>
         <div className={styles.group}>
           <MediaComponent prefix={prefix}  media={data[1].media!} />
            <div className={classNames(styles.copy,styles.center)}>
              <h3 className={styles.title}>律动波纹格栅</h3>
              <p>
              大胆采用精巧稳重的檐瓦造型，格栅更宽更大，体量感增大；同时结合现代的参数化设计，雕刻出超越想象的工艺细节；在格网转折与高亮镀铬装饰的映衬下，不仅显露出向外侧扩展的动势，豪华气息亦扑面而来。
              </p>
            </div>
         </div>
         <div className={styles.group}>
           <MediaComponent prefix={prefix} media={data[2].media!} />
            <div className={classNames(styles.copy,styles.center)}>
              <h3 className={styles.title}>光迹交互LED大灯</h3>
              <p>90颗LED光源，通过激光镭雕工艺，尽显晶莹剔透的水晶质感。以星耀与星悦两种灯语，呈现丰富动态灯光交互，加之8种照明模式，辉映不凡之路。</p>
            </div>
         </div>
         <div className={styles.group}>
           <MediaComponent prefix={prefix} media={data[3].media!}  />
              <div className={classNames(styles.copy)}>
                <h3 className={styles.title}>贯穿式浮光LED尾灯</h3>
                <p>与头灯造型呼应，由730颗LED光源组成了尾灯光幕。由中间向外侧点亮，有节奏感地唤醒势能。光影交相辉映，尽展奢华风度。</p> 
              </div>

         </div>
         <div className={styles.group}>
           <MediaComponent prefix={prefix} media={data[4].media!}   />
            <div className={classNames(styles.copy,styles.right)}>
              <h3 className={styles.title}>对置式光感门把手</h3>
              <p>配备具有迎宾功能的门把手LED灯带，与流光礼宾灯光秀相呼应，打造全方位礼宾视觉体验。</p> 
            </div>
         </div>
         <div className={styles.group}>
           <MediaComponent prefix={prefix} media={data[5].media!}  />
            <div className={classNames(styles.copy,styles.center)}>
              <h3 className={styles.title}>银翼光毯</h3>
              <p>伴随电动滑移门缓缓开启，一场感官之旅向前铺展。2.5米光幕地毯，搭配自带光芒的迎宾踏板。雅致流光，彰显至臻款待之道。</p> 
            </div>
         </div>
         <div className={styles.group}>
           <MediaComponent prefix={prefix} media={data[6].media!}  />
            <div className={classNames(styles.copy,styles.right)}>
              <h3 className={styles.title}>19吋伞型流光铝合金轮毂</h3>
              <p>四座私享版专属19吋伞型流光铝合金轮毂，采用高级科技灰喷涂，格调不彰自显。精妙起伏曲面，辅以局部抛光工艺，扭转瞬息间，绽放光华。</p> 
            </div>
         </div>
         <div className={styles.group}>
           <MediaComponent prefix={prefix} media={data[7].media!}  />
            <div className={classNames(styles.copy)}>
              <h3 className={styles.title}>背光氛围灯</h3>
              <p>90颗LED灯珠形成422个星点环抱座舱，以山水流光为灵感，采用三级漫反射出光模式，带来沉浸式光影体验。</p> 
            </div>
         </div>
         <div className={styles.group}>
           <MediaComponent prefix={prefix} media={data[8].media!}  />
             <div className={classNames(styles.copy,styles.right,styles.top)}>
              <h3 className={styles.title}>山水鎏银真木饰件</h3>
              <p>精选欧洲上等白栓木，以木纹纹理模拟水波流动，金属纹理模拟山脉走势，仿若游弋于湖光山色之间。</p> 
            </div>
            <div className={classNames(styles.copy,styles.center)}>
              <h3 className={styles.title}>128色动态氛围灯</h3>
              <p>汲取山水流光灵感，多达128色动态环境氛围灯，与五大场景互动融合，提升驾乘礼遇感。</p> 
            </div>
         </div>
         <div className={styles.group}>
           <MediaComponent prefix={prefix} media={data[9].media!}  />
            <div className={classNames(styles.copy)}>
              <h3 className={styles.title}>麦穗纹绗缝纹理门饰板</h3>
              <p>麦穗纹寓意平安顺遂，平添端庄奢华。多层绗缝工艺首次运用于侧围皮革包覆，技术与艺术交相辉映，交织出前所未见的丰富立体感。</p> 
            </div>
         </div>
         <div className={styles.group}>
           <MediaComponent prefix={prefix} media={data[10].media!}  />
            <div className={classNames(styles.copy,styles.right)}>
              <h3 className={styles.title}>澳洲进口羊毛地毯</h3>
              <p>采用13mm澳洲进口羊毛地毯，达到居家级地毯品质，柔软细腻，可享裸足般的脚底触感。</p> 
            </div>
         </div>
      </div>

  );
  
};

export default Exterior;
