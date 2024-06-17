import { type FC, useEffect, useRef } from 'react'
import { combineUrl } from '@utils/helper'
import classNames from 'classnames'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import styles from '@styles/components/velite-common.module.scss'
gsap.registerPlugin(ScrollTrigger);

import type { FeatureMediaPrefix, VeliteSliderType } from '~types/feature';
import type { VeliteCategoryProps } from './VeliteList';
import YoukuPlayer from '@components/YoukuPlayer';
import MediaComponent from '@components/MediaComponent';
import { trackPv } from '@utils/tracking';

type VeliteSliderProps = FeatureMediaPrefix & VeliteCategoryProps & {
  data: VeliteSliderType
}

const VeliteHorizonal: FC<VeliteSliderProps> = ({ category,name, data, prefix }) => {

  const horizontailItem = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    ScrollTrigger.refresh();
    ScrollTrigger.sort();
    const slide_list_wrap = horizontailItem.current.getElementsByClassName(styles.slide_list_wrap)[0];
    const picItemArr = horizontailItem.current.querySelectorAll('.picItem');
    const h3 = horizontailItem.current.getElementsByClassName('titleAni');
    const p = horizontailItem.current.getElementsByClassName('textAni');
    // const left = window.innerWidth / 1920 * 150;
    // const gappc = window.innerWidth / 1920 * 40;
    const gapm = window.innerWidth / 750 * 75;
    let track = true;
    const picbox = gsap.timeline({
      scrollTrigger: {
        pin: true,
        scrub: 1,
        trigger: horizontailItem?.current,
        invalidateOnRefresh: true,
        end: () => '+=' + window.innerHeight * (data.content.length - 1),
        onUpdate:(self) => {
          const progress = Number(self.progress.toFixed(2)) * 100;
          if(track && progress > 1 && progress < 100){
            console.log('horizonal',category)
            trackPv(`车型页-${name}-${category.text}`);
            track = false;
          }
          if(progress === 100 || progress <= 0){
            track = true;
          }
        }
      },

      defaults: { ease: "none", duration: 1 }
    })

    const switchMedia = gsap.matchMedia(horizontailItem?.current),
      breakPoint = 769;

    switchMedia.add({
      // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,

    }, (context) => {

      // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
      const { isDesktop } = context.conditions!;

      picbox.to(picItemArr, {
        x: () => isDesktop ? -(slide_list_wrap.scrollWidth - document.documentElement.clientWidth * 0.4) + 'px' : -(slide_list_wrap.scrollWidth - (document.documentElement.clientWidth * 0.8)) + (gapm) + 'px'
      //  x: () => isDesktop ? -(slide_list_wrap.scrollWidth - document.documentElement.clientWidth) - (gappc + left) + 'px' : -(slide_list_wrap.scrollWidth - (document.documentElement.clientWidth * 0.8)) + (gapm) + 'px'
      }, '-=1')
        .to(p, {
          y: 0,
          opacity: 1,
          duration: 0.2,
          stagger: {
            amount: 0.8
          }
        }, '-=1')
        .to(h3, {
          y: 0,
          opacity: 1,
          duration: 0.2,
          stagger: {
            amount: 0.8
          }
        }, '-=1')
      return () => {
        // optionally return a cleanup function that will be called when none of the conditions match anymore (after having matched)
      }
    });


    // const videoArr: NodeListOf<Element> = horizontailItem.current.querySelectorAll('.video_player');
    // if (videoArr) {
    //   for (let i of videoArr as any) {
    //     const id = i.getAttribute('id');
    //     const vid = i.getAttribute('data', 'vid')
    //     const poster = i.getAttribute('data', 'poster')
    //     youkuVideo(id, {
    //       poster: poster,
    //       vid: vid,
    //       autoplay: true,
    //       preview: true,
    //       rebuild: true,
    //     })
    //   }
    // }
    ScrollTrigger.addEventListener('refresh', () => {
      ScrollTrigger.sort();
    })
     return () => {
    //   picbox.scrollTrigger?.kill();
       switchMedia?.kill(true)
     }
  }, [category, data.content.length, name])

  return (
    <div id="horizonal">
      <div className={classNames(styles.page, styles.horizontail)} ref={horizontailItem}>
        <div className={classNames(styles.absolute)}>
          <div className={classNames(styles.container)}>
            <div className={classNames(styles['page-title'])}>
              <span className={classNames(styles.en)}>{category.en}</span>
              <h4>{category.text}</h4>
            </div>
            <div className={classNames(styles['slide_list_wrap'])}>
              {data.content.map((item, idx) => {
                const PC_MEDIA = Array.isArray(item.media) ? item.media.find(item => !item.device || item.device === 'pc') : item.media
                const IS_VIDEO = Array.isArray(item.media) ? item.media[0]?.type === 'video' : item.media?.type === 'video'
                if (IS_VIDEO) {
                  return (
                    <div key={idx} className={classNames(styles.item, 'picItem')}>
                      <div className={classNames(styles.pic)}>
                        {PC_MEDIA && <YoukuPlayer id={`velite_hor_${idx}`} className={classNames(styles.youkuVideo, "video_player")} poster={combineUrl(prefix, PC_MEDIA.poster)} vid={PC_MEDIA.url} />}
                        {/* <div id={`driving_video_${idx}`} ></div>  */}
                      </div>

                      <div className={classNames(styles['textwrap'], 'text-wrap')}>
                        <h3 className={idx === 0 ? '' : ('titleAni')}>{item.text?.title}</h3>
                        <p className={idx === 0 ? '' : ('textAni')}>{item.text?.content}</p>
                      </div>
                    </div>
                  )
                } else if (PC_MEDIA) {
                  return (<div key={idx} className={classNames(styles.item, 'picItem')}>
                    <div className={classNames(styles.pic)}>
                      <MediaComponent media={PC_MEDIA} prefix={prefix} title={item.text?.title || category.text} normal />
                    </div>
                    <div className={classNames(styles['textwrap'], 'text-wrap')}>
                      <h3 className={idx === 0 ? '' : ('titleAni')}>{item.text?.title}</h3>
                      <p className={idx === 0 ? '' : ('textAni')}>{item.text?.content}</p>
                    </div>
                  </div>)
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VeliteHorizonal
