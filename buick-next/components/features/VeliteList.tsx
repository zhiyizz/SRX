import { type FC, useEffect, useRef } from 'react'
import classNames from 'classnames'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import styles from '@styles/components/velite-common.module.scss'
import { Swiper, SwiperSlide } from "swiper/react"

import { Navigation, Pagination, Grid, Thumbs } from "swiper"
import type { FeatureCategory, FeatureMediaPrefix, VeliteListType } from '~types/feature'
import MediaComponent from '@components/MediaComponent'
import { combineUrl } from '@utils/helper'
import YoukuPlayer from '@components/YoukuPlayer';
import { trackPv } from '@utils/tracking'
gsap.registerPlugin(ScrollTrigger)

export type VeliteCategoryProps = {
  category: FeatureCategory
}

type VeliteListProps = FeatureMediaPrefix & VeliteCategoryProps & {
  data: VeliteListType
}

const VeliteList: FC<VeliteListProps> = ({ category, name, data, prefix }) => {
  const fbiItem = useRef<HTMLDivElement>(null!)
  // const [thumbSwiper, setThumbSwiper] = useState<any>()

  useEffect(() => {
    // const item = fbiItem.current.querySelectorAll('.item')

    // //  const cur = gsap.timeline({
    // //    scrollTrigger:{
    // //      trigger:item,
    // //      scrub:true,
    // //      markers:true
    // //    }
    // //  }).fromTo(item,{y:20,opacity:0,duration:.2, stagger:.8},{y:0,opacity:1,duration:.2,stagger:.8})

    // const itemArr = gsap.utils.toArray(fbiItem.current.getElementsByClassName('item'));
    // gsap.timeline({
    //   scrollTrigger:{
    //     trigger:item,
    //     scrub:true,
    //     markers:true,

    //   }
    // }).to(item,{y:0,opacity:1,duration:.2,stagger:.8})


    // const updateStrigger = () => {

    //   ScrollTrigger.refresh();
    //   ScrollTrigger.sort();
    //   batch(item, {
    //     interval: 0.1, // time window (in seconds) for batching to occur. The first callback that occurs (of its type) will start the timer, and when it elapses, any other similar callbacks for other targets will be batched into an array and fed to the callback. Default is 0.1
    //     batchMax: 3,   // maximum batch size (targets)
    //     onEnter: batch => gsap.to(batch, { autoAlpha: 1, y: 0, stagger: 0.15, overwrite: true }),
    //     onLeave: batch => gsap.set(batch, { autoAlpha: 0, y: 30, overwrite: true }),
    //     onEnterBack: batch => gsap.to(batch, { autoAlpha: 1, y: 0, stagger: 0.15, overwrite: true }),
    //     onLeaveBack: batch => gsap.set(batch, { autoAlpha: 0, y: 30, overwrite: true })
    //     // you can also define things like start, end, etc.
    //   });
    //   // the magical helper function (no longer necessary in GSAP 3.3.1 because it was added as ScrollTrigger.batch())...
    //   function batch(targets: string | object | null, vars: { [x: string]: any; interval: any; batchMax: any; onEnter?: (batch: any) => gsap.core.Tween; onLeave?: (batch: any) => gsap.core.Tween; onEnterBack?: (batch: any) => gsap.core.Tween; onLeaveBack?: (batch: any) => gsap.core.Tween; }) {
    //     let varsCopy: any = {},
    //       interval = vars.interval || 0.1,
    //       proxyCallback = (type: string, callback: (arg0: any[]) => void) => {
    //         let batch: any[] = [],
    //           delay = gsap.delayedCall(interval, () => { callback(batch); batch.length = 0; }).pause();
    //         return (self: { trigger: any; }) => {
    //           batch.length || delay.restart(true);
    //           batch.push(self.trigger);
    //           vars.batchMax && vars.batchMax <= batch.length && delay.progress(1);
    //         };
    //       },
    //       p;
    //     for (p in vars) {
    //       varsCopy[p] = (~p.indexOf("Enter") || ~p.indexOf("Leave")) ? proxyCallback(p, vars[p]) : vars[p];
    //     }
    //     gsap.utils.toArray(targets).forEach(target => {
    //       let config: any = {};
    //       for (p in varsCopy) {
    //         config[p] = varsCopy[p];
    //       }
    //       config.trigger = target;

    //       ScrollTrigger.create(config);

    //     });
    //   }
    // }

    let timeLine: gsap.core.Timeline;
    let track = true;
    const mediaM = gsap.matchMedia(fbiItem.current);
    mediaM.add({
      isMobile: `(max-width: 767.98px)`,
      isDesktop: `(min-width: 768px)`,
      reduceMotion: "(prefers-reduced-motion: reduce)"
    }, (context) => {
        const { isMobile } = context.conditions!;
        timeLine = gsap.timeline({
          scrollTrigger: {
            trigger: fbiItem.current,
            scrub: true,
            start: isMobile ? 'top center-=30vh' : 'center bottom-=5vh',
            end: isMobile ? 'bottom bottom' : 'center center',
            onUpdate:(self) => {
              const progress = Number(self.progress.toFixed(2)) * 100;
              if(track && progress > 1 && progress < 100){
                console.log('list',category)
                trackPv(`车型页-${name}-${category.text}`);
                track = false;
              }
              if(progress === 100 || progress <= 0){
                track = true;
              }
            }
          }
        })
        timeLine.to(fbiItem.current.getElementsByClassName(styles['item']), {
            startAt: { y: '15%' },
            opacity: 1,
            direction:1,
            stagger: isMobile ? 0.5 : 0.1,
            y: 0
          }, `-=1`)
    });


   // updateStrigger()

    //window.addEventListener('resize', updateStrigger, false)
    return () => {
      timeLine.scrollTrigger?.kill()
      mediaM?.kill(true)
     // window.removeEventListener('resize', updateStrigger)
  //    ScrollTrigger.killAll()
    }
  }, [category, name])

  const LIST_COUNT = data.content.length

  return (
    <div id="list">
      <div className={classNames(styles.fbiItem)} ref={fbiItem}>
        <div className={classNames(styles.container)}>
          <div className={classNames(styles['page-title'])}>
            <span className={classNames(styles.en)}>{category.en}</span>
            <h4>{category.text}</h4>
          </div>
          <div className={classNames(styles.items)}>
            <Swiper
              breakpoints={{
                320:
                  data.tiled ? {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    centeredSlides: true,
                    navigation: false,
                    grid: {
                      rows: Math.ceil(LIST_COUNT),
                      fill: 'row'
                    }
                  } : {
                    slidesPerView: 1.2,
                    spaceBetween: 10,
                    centeredSlides: true,
                    navigation: false
                  }
                ,
                769: {
                  slidesPerView: 3,
                  grid: {
                    rows: Math.ceil(LIST_COUNT / 3),
                    fill: 'row'
                  }
                }
              }}
              // thumbs={{ swiper: thumbSwiper }}
              observer={true}
              observeParents={true}
              resizeObserver={true}
              spaceBetween={30}
              pagination={{
                clickable: true
              }}
              modules={[Grid, Thumbs]}
              className={data.tiled ? classNames(styles.swiperm, "swiperbox") : "swiperbox"}
            >
              {data.content.map((item, idx) => {
                if (Array.isArray(item)) {
                  const ONLY_ONE_TEXT = item[0]?.text && !item[1]?.text

                  return <SwiperSlide key={idx} className={classNames(styles.item, 'item')}>
                    <Swiper
                      navigation={true}
                      modules={[Navigation, Pagination]}

                      className="mySwiper"
                    >
                      {item.map((sub_item, idx2) => (
                        <SwiperSlide key={idx2} >
                          {sub_item.media && <MediaComponent media={sub_item.media} prefix={prefix} title={sub_item.text?.title} normal />}
                          {!ONLY_ONE_TEXT && (
                            <div className={styles.copy}>
                              <h3>{sub_item.text?.title}</h3>
                              <p>{sub_item.text?.content}</p>
                            </div>
                          )}
                        </SwiperSlide>
                      ))}

                      {ONLY_ONE_TEXT && (
                        <div className={styles.copy}>
                          <h3>{item[0].text?.title}</h3>
                          <p>{item[0].text?.content}</p>
                        </div>
                      )}
                    </Swiper>
                  </SwiperSlide>
                } else {
                  const PC_MEDIA = Array.isArray(item.media) ? item.media.find(item => !item.device || item.device === 'pc') : item.media
                  const IS_VIDEO = Array.isArray(item.media) ? item.media[0]?.type === 'video' : item.media?.type === 'video';
                
                  if(IS_VIDEO){
                    return (
                      <SwiperSlide key={idx} className={classNames(styles.item, 'item')}>
                        {PC_MEDIA && <YoukuPlayer id={`velite_list_${idx}`} className={classNames(styles.youkuVideo, "video_player")} poster={combineUrl(prefix, PC_MEDIA.poster)} vid={PC_MEDIA.url} />}
                        <div className={styles.copy}>
                          <h3>{item.text?.title}</h3>
                          <p>{item.text?.content}</p>
                        </div>
                      </SwiperSlide>
                    )
                  }else{
                    return (
                      <SwiperSlide key={idx} className={classNames(styles.item, 'item')}>
                        {item.media && <MediaComponent media={item.media} prefix={prefix} title={item.text?.title} normal />}
                        <div className={styles.copy}>
                          <h3>{item.text?.title}</h3>
                          <p>{item.text?.content}</p>
                        </div>
                      </SwiperSlide>
                    )
                  }

                }
              })}
            </Swiper>
          </div>
        </div>
      </div>

    </div>
  )
}

export default VeliteList
