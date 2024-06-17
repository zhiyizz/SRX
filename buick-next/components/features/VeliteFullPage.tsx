import { type FC, useEffect, useRef } from 'react';
import { combineUrl } from '@utils/helper';
import classNames from 'classnames';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import styles from '@styles/components/velite-common.module.scss'
import type { FeatureMediaPrefix, VeliteFullPageType } from '~types/feature';
import MediaComponent from '@components/MediaComponent';
import YoukuPlayer from '@components/YoukuPlayer';
gsap.registerPlugin(ScrollTrigger);

type VeliteFullpageProps = FeatureMediaPrefix & {
  data: VeliteFullPageType
}

const VeliteFullPage: FC<VeliteFullpageProps> = ({ data, prefix }) => {

  const fullfbi = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    ScrollTrigger.refresh();
    ScrollTrigger.sort();
    const h3 = fullfbi.current.getElementsByTagName('h3')[0];
    const p = fullfbi.current.getElementsByTagName('p')[0];
    const img = fullfbi.current.getElementsByTagName('img')[0]
    // let cur: gsap.core.Timeline;
    const switchMedia = gsap.matchMedia(fullfbi.current);
    switchMedia.add("(min-width: 769px)", () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: fullfbi.current,
          pin: true,
          scrub: true,
          start: () => 'top top',
        }
      }).to(h3, { y: 0, opacity: 1 }).to(p, { y: 0, opacity: 1 })
    })
    switchMedia.add("(max-width: 768px)", () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: fullfbi.current,
          scrub: true,
          invalidateOnRefresh: true,
          start: () => 'center center'
        }
      }).to(img, { scale: 1.2 }, '-=1')
    })
     return () => {
    //   cur.scrollTrigger?.kill();
       switchMedia?.kill(true);
     }

  }, [])

  const MEDIA = Array.isArray(data.media) ? data.media[0] : data.media
  const IS_VIDEO = MEDIA.type === 'video'
  const IS_POSTER_TYPE = MEDIA.postertype === 'video'

  return (
    <div id="fullpage">
      <div className={classNames(styles.page, styles.fullfbi)} ref={fullfbi}>
        <div className={classNames(styles.bg)}>
          <div className={classNames(styles['pic-wrap'])}>
            {IS_VIDEO ? (
              IS_POSTER_TYPE?<YoukuPlayer id={`velite_fp_${prefix.replace(/[\/\\]/g, '')}`} className={classNames(styles.youkuVideo, "video_player")} postertype={MEDIA.postertype}  poster={combineUrl(prefix, MEDIA.poster)} vid={MEDIA.url} />:
                <YoukuPlayer id={`velite_fp_${prefix.replace(/[\/\\]/g, '')}`} className={classNames(styles.youkuVideo, "video_player")}  poster={combineUrl(prefix, MEDIA.poster)} vid={MEDIA.url} />
            ) : (
              <MediaComponent media={data.media} prefix={prefix} title={data.text.title} />
            )}
          </div>
          <div className={classNames(styles.copy)}>
            <h3>{data.text.title}</h3>
            <p>{data.text.content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VeliteFullPage
