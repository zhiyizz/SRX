import { type FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import styles from '@styles/components/velite-common.module.scss'
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import type { FeatureMediaPrefix, VeliteEngineType } from '~types/feature';
import type { VeliteCategoryProps } from './VeliteList';
import MediaComponent from '@components/MediaComponent';
gsap.registerPlugin(ScrollTrigger);

type VeliteEngineProps = FeatureMediaPrefix & VeliteCategoryProps & {
  data: VeliteEngineType
}

const VeliteEngine: FC<VeliteEngineProps> = ({ category, data, prefix }) => {
  const engine = useRef<HTMLDivElement>(null!)
  useEffect(() => {
    ScrollTrigger.refresh();
    ScrollTrigger.sort();
    const media = engine.current.getElementsByClassName(styles.media)[0]
    const li = engine.current.getElementsByTagName('li');
    const copy = engine.current.getElementsByClassName(styles.copy)[0];

    const cur = gsap.timeline({
      scrollTrigger: {
        trigger: engine.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + window.innerHeight * 2
      }
    })
    cur.set(media, { scale: 1.5, right: '-150vw', top: '-100vw' })
    cur.to(media, { right: 0, top: 0, scale: 1.5, duration: 2 })
      .to(media, { top: 0, right: 0, scale: 1, duration: 2 })
      .to(li, { y: 0, opacity: 1, stagger: { amount: .5 } })
      .to(copy, { y: 0, opacity: 1, duration: 2 })
    // return () => {
    //   cur.scrollTrigger?.kill();
    // }
  }, [])
  return (
    <div id="engine">
      <div className={classNames(styles.page, styles.engine)} ref={engine}>
        <div className={classNames(styles.container)}>
          <div className={classNames(styles['page-title'])}>
            <span className={classNames(styles.en)}>{category.en}</span>
            <h4>{category.text}</h4>
          </div>

          <div className={classNames(styles.specs)}>
            <ul>
              {data.engine.specs.map((item, idx) => {
                return (
                  <li key={idx}>
                    <div className={classNames(styles.title)}>
                      {item.title}
                    </div>
                    <div className={classNames(styles.content)}>
                      <span>{item.content}</span>{item.alt}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className={classNames(styles.media)}>
            <MediaComponent media={data.media} prefix={prefix} title={data.text.title} normal />
          </div>
          <div className={styles.copy}>
            <div className={classNames(styles.title)}>
              <h3>{data.text.title}</h3>
            </div>
            <div className={classNames(styles.line, 'line')}></div>
            <div className={classNames(styles.text)}>
              <p>{data.text.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VeliteEngine
