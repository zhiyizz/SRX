import { type FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import styles from '@styles/components/velite-common.module.scss'
import type { FeatureMediaPrefix, VeliteDifferType } from '~types/feature';
import MediaComponent from '@components/MediaComponent';
gsap.registerPlugin(ScrollTrigger);

type VeliteDifferProps = FeatureMediaPrefix & {
  data: VeliteDifferType
}

const VeliteDiffer: FC<VeliteDifferProps> = ({ data, prefix }) => {

  const comparsion = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    ScrollTrigger.refresh();
    ScrollTrigger.sort();
    const h3 = comparsion.current.getElementsByTagName('h3')[0];
    const p = comparsion.current.getElementsByTagName('p')[0];
    const after = comparsion.current.getElementsByClassName(styles.after)[0];
    const after_img = after.getElementsByTagName('img')[0];
    // let cur: gsap.core.Timeline;
    const switchMedia = gsap.matchMedia();
    switchMedia.add("(min-width: 769px)", () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: comparsion.current,
          pin: true,
          scrub: true,
          end: () => "+=" + window.innerHeight * 2
        }
      })
        .to(h3, { y: 0, opacity: 1 })
        .to(p, { y: 0, opacity: 1 })
        .fromTo(after, { xPercent: 100, x: 0 }, { xPercent: 0, duration: 2 }, 1)
        .fromTo(after_img, { xPercent: -100, x: 0 }, { xPercent: 0, duration: 2 }, 1)
    })
    switchMedia.add("(max-width: 768px)", () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: comparsion.current,
          scrub: true,
        }
      }).fromTo(after, { xPercent: 100, x: 0 }, { xPercent: 0 }, 0)
        .fromTo(after_img, { xPercent: -100, x: 0 }, { xPercent: 0 }, 0)
    })

     return () => {
    //   cur.scrollTrigger?.kill();
       switchMedia.kill(true);
     }
  }, [])

  return (
    <div id="differ">
      <div className={classNames(styles.page, styles.fullfbi, styles.comparasionImage)} ref={comparsion}>
        <div className={classNames(styles.bg)}>
          <div className={classNames(styles.image)}>
            <MediaComponent media={data.media.before} prefix={prefix} title={data.text.title} />
          </div>
          <div className={classNames(styles.image, styles.after)}>
            <MediaComponent media={data.media.after} prefix={prefix} title={data.text.title} />
          </div>
        </div>
        <div className={classNames(styles.copy)}>
          <h3>{data.text.title}</h3>
          <p>{data.text.content}</p>
        </div>
      </div>
    </div>
  );
};

export default VeliteDiffer;
