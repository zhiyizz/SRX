import { type FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import styles from '@styles/components/velite-common.module.scss'
import type { FeatureMediaPrefix, VeliteKvResource } from '~types/feature';
import MediaComponent from '@components/MediaComponent';
import { divideByElement } from '@utils/helper';

gsap.registerPlugin(ScrollTrigger);


type VeliteKvProps = FeatureMediaPrefix & {
  data: VeliteKvResource
}

const VeliteKv: FC<VeliteKvProps> = ({ data, prefix }) => {
  const subKv = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
      ScrollTrigger.sort();
    },500)
   
    const line = subKv.current.getElementsByClassName('line')[0]
    const title = subKv.current.getElementsByClassName(styles.title)[0]
    const text = subKv.current.getElementsByClassName(styles.text)[0]
    const light = subKv.current.getElementsByClassName(styles.light)[0]
    const cur = gsap.timeline({
      scrollTrigger: {
        trigger: subKv.current,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        end: () => "+=" + window.innerHeight * 2
      }
    })
    cur
      .to(title, { y: 0, opacity: 1 },'-=1')
      .to(line, { width: '100%' },'-=1')
      .to(text, { y: 0, opacity: 1 },'-=1')
      .to(light, { opacity: 1 },'-=1')
    return () => {
      cur.scrollTrigger?.kill()
    }
  }, [])
  return (
    <div id="kv">
      <div className={classNames(styles['page'], styles['sub-kv'], styles['sub-kv-m'], data.align && styles[data.align])} ref={subKv}>
        <MediaComponent media={data.media} prefix={prefix} title={data.text.title} />
        {data.light && <MediaComponent media={data.light} prefix={prefix} className={classNames(styles.light, 'light')} />}
        <div className={classNames(styles.absolute)}>
          {data.extra ? (
            <div className={classNames(styles.copy, styles.items)}>
              <div className={classNames(styles.title)}>
                <h3>{divideByElement(data.text.title)}</h3>
                <p className={classNames(styles['sub-title'], 'pc')}>{divideByElement(data.text.content)}</p>
                <p className={classNames(styles['sub-title'], 'm')}>{divideByElement(data.text.alt || data.text.content)}</p>
              </div>
              <div className={classNames(styles.line, 'line')}></div>
              <div className={classNames(styles.text)}>
                {data.extra.map((item, idx) => {
                  return (
                    <div key={idx} className={classNames(styles.item)}>
                      <span><b>{item.content}</b>{item.alt}</span>
                      <p>{item.title}</p>
                    </div>
                  )
                })
                }
              </div>
            </div>
          ) : (
            <div className={styles.copy}>
              <div className={classNames(styles.title)}>
                <h3>{divideByElement(data.text.title)}</h3>
              </div>
              <div className={classNames(styles.line, 'line')}></div>
              <div className={classNames(styles.text)}>
                <p className={classNames(styles['sub-title'], 'pc')}>{divideByElement(data.text.content)}</p>
                <p className={classNames(styles['sub-title'], 'm')}>{divideByElement(data.text.alt || data.text.content)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

  )
}

export default VeliteKv
