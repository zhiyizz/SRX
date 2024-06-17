import { type FC, useEffect, useRef, useState } from 'react';
import { combineUrl } from '@utils/helper';
import classNames from 'classnames';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import styles from '@styles/components/velite-common.module.scss'
import type { FeatureMediaPrefix, VeliteSliderType } from '~types/feature';
import type { VeliteCategoryProps } from './VeliteList';
import YoukuPlayer from '@components/YoukuPlayer';
import { trackPv } from '@utils/tracking';
import AliImage from '@components/AlImage';
gsap.registerPlugin(ScrollTrigger);

type VeliteVerticalProps = FeatureMediaPrefix & VeliteCategoryProps & {
  data: VeliteSliderType,
}

const VeliteVertical: FC<VeliteVerticalProps> = ({ category, name, data, prefix }) => {

  const driving = useRef<HTMLDivElement>(null!);
  const [sH, setsH] = useState<number>();
  const [pageLen, setPageLen] = useState<number>()
 // const [trackName,setTrackName] = useState<boolean>(true)
 const [videoHide,setVideoHide] = useState<boolean>();
  const [pageNum, setPageNum] = useState<number>(1)
  useEffect(() => {
    ScrollTrigger.refresh();
    ScrollTrigger.sort();
    const picItem = driving.current.querySelectorAll('.picItem:not(.notAni)');
    const h3 = driving.current.querySelectorAll('.title');
    const text = driving.current.querySelectorAll('.text');
    setPageLen(picItem.length + 1)
    gsap.set(".picItem", { zIndex: (i, target, targets) => targets.length - i });
    gsap.set(h3[0], { scale: .9 });
    let track = true;
    const picbox = gsap.timeline({
      scrollTrigger: {
        trigger: driving?.current,
        pin: true,
        start: () => "top top",
        end: () => "+=" + window.innerHeight * (picItem.length - 1),
        scrub: 1,
        toggleActions: "play none reverse none",
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = Number(self.progress.toFixed(2)) * 100;
          if(track && progress > 1 && progress < 100){
            console.log('vertical',category)
            trackPv(`车型页-${name}-${category.text}`);
            track = false;
          }
          if(progress === 100 || progress <= 0){
            track = true;
          }
          setsH(progress);
        },
      }
    })

    picItem?.forEach((image, i) => {
      picbox
        .to(image, {
          y: ' -100%',
           duration: 2,
          onStart: (idx) => {
            setPageNum(idx + 2);
   
              setTimeout(() => {
                setVideoHide(true)
              },500)
      
           
          },
          onReverseComplete: (idx) => {
            setPageNum(idx + 1);
    
            setTimeout(() => {
              setVideoHide(true)
            },500)
    
          },
          onCompleteParams: [i],
          onReverseCompleteParams: [i],
          onStartParams: [i]
        }
        )
        .to(h3[i + 1], { scale: .8 }, '-=1')
        .to(h3[i], { scale: 1 }, '-=1')
        .to(text[i + 1], { height: 'auto' }, '-=1')
        .to(text[i], { height: 0 }, '-=1')
    });

    // return () => {
    //   picbox.scrollTrigger?.kill();
    // }
  }, [category, name])

  if (data.direction === 'horizontal') return null

  const LIST_COUNT = data.content.length

  return (
    <div id="vertical">
      <div className={classNames(styles.page, styles.driving)} id="driving" ref={driving}>
        <div className={classNames(styles.absolute)}>
          <div className={classNames(styles.container)}>
            <div className={classNames(styles['page-title'])}>
              <span className={classNames(styles.en)}>{category.en}</span>
              <h4>{category.text}</h4>
            </div>
            <div className={classNames(styles['slide_list'])}>
              <div className={classNames(styles.pic)}>
                {data.content.map((item, idx) => {
                  const PC_MEDIA = Array.isArray(item.media) ? item.media.find(item => !item.device || item.device === 'pc') : item.media
                  const IS_VIDEO = Array.isArray(item.media) ? item.media[0]?.type === 'video' : item.media?.type === 'video'
                  if (IS_VIDEO) {
                    return (
                      <div key={idx} className={classNames(styles.item, 'picItem', idx === LIST_COUNT - 1 ? 'notAni' : '')}>
                        {PC_MEDIA && <YoukuPlayer id={`velite_ver_${idx}`} className="youku-parent" onBack={setVideoHide} rebuild={videoHide} poster={combineUrl(prefix, PC_MEDIA.poster)} vid={PC_MEDIA.url} />}
                      </div>
                    )
                  } else {
                    return (<div key={idx} className={classNames(styles.item, 'picItem', idx === LIST_COUNT - 1 ? 'notAni' : '')}>
                      {/* <Image src={`/img/velite7/driving/${PC_MEDIA?.url}`} alt="" layout='fill' /> */}
                      <AliImage src={combineUrl(prefix, PC_MEDIA?.url)} alt={PC_MEDIA?.alt || item.text?.title || category.text} width={PC_MEDIA?.width} height={PC_MEDIA?.height} />
                    </div>)
                  }
                })}
              </div>
              <div className={classNames(styles.copy)}>
                {data.content.map((item, idx) => {
                  return (
                    <div key={idx} className={classNames(styles.item, idx === 0 ? styles.auto : '', 'textItem')}>
                      <h3 className='title'>{item.text?.title}</h3>
                      <div className={classNames(styles.p, 'text')}>{item.text?.content}</div>
                    </div>
                  )
                })}
              </div>
              <div className={classNames(styles.progress)}>
                <span style={{ 'height': sH + '%' }}></span>
              </div>
              <div className={classNames(styles['page-num'])}>
                <span className={classNames(styles.pagenum)}> {pageNum} </span> / {pageLen}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VeliteVertical;
