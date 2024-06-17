'use client'

import { type FC, useEffect, useRef, useState, useCallback } from 'react';
import styles from '@styles/components/youku-player.module.scss';
import classNames from 'classnames';
import Script from 'next/script';
import AliImage from './AlImage';

type YoukuPlayerProps = {
    id: string
    vid: string
    poster?: string
    preview?:boolean,
    className?: string,
    postertype?:string
    autoplay?:boolean,
    controls?:boolean,
    posterm?:string,
    rebuild?:boolean
    onBack?:(item:boolean) => void
  }

const YoukuPlayers:FC<YoukuPlayerProps>  = ({ id, vid, poster,preview=true, posterm, rebuild = false, onBack, autoplay=true,controls=false,  postertype,className }) => {

  const [divId,setDivId] = useState<string>(null!);
  const [isAndroid,setIsAndroid] = useState<boolean>();
  const [isMobile,setIsMobile] = useState<RegExpMatchArray | null>();
  const [playing,setPlaying] = useState<boolean>();
  const divEle = useRef<HTMLDivElement>(null);
  const playid = useRef<HTMLVideoElement>(null);
  const [videoId, setVideoId] = useState<string>(null!)
  const obj = useRef({
    id:`${id}_${vid}`,
    autoplay:poster?autoplay:false,
    poster:poster,
    controls:controls,
    vid:videoId,
    postertype:postertype,
    preview:preview,
    posterm:posterm
  }).current;

  useEffect(() => {
    let ykVid = vid
    if (/^http/.test(vid)) {
      const match = vid.match(/(?:\/(?:id_)?)([\w\=]+)(?=\?|\.html)/)
      if (match) {
        const [, extract] = match
        ykVid = extract
      }
    }

    setVideoId(ykVid)
    setDivId(`${id}_${ykVid}`)
  }, [id, vid])

  const _buildYoukuVideoPlayer =   useCallback(() => {
    const vObj: Record<string, unknown> = {
      styleid: '0', 
      id: "ykv_" + divId, 
      prefer: "flash",
      client_id: '08e2ea03c2c3fffd',//buick
      vid: videoId, 
      autoplay: obj.autoplay,
      newPlayer: false, 
      show_related: false,
      events: {
        onPlayEnd: function () { },
        onPlayStart: function () {
          setPlaying(true)
          onBack?.(false)
          },
        onPlayerReady: function () {
          if(!isMobile){
            //  if(!poster){
            //    setPlaying(true)
            //  }
            onBack?.(false)
          }
        }
      }
    };

    if (!window.YKU) return

    if (postertype){
      if(isAndroid){
        vObj.poster = `${poster}.webp`
      }else{
        vObj.poster = null;
      }
    } else{
      vObj.poster = poster ? poster : null;
    }
      new YKU.Player(divId, vObj);
  
  },[divId, videoId, obj.autoplay, postertype, onBack, isMobile, isAndroid, poster]) 

  const buildretry = useCallback(() => {
    const cb = () => {
      if (!window.YKU) {
        setTimeout(cb, 100);
      } else {
        _buildYoukuVideoPlayer()
      }
    }
    cb()
  }, [_buildYoukuVideoPlayer])
  useEffect(() => {
    if(rebuild){
      if(poster){
        (document.getElementById(divId)  as HTMLElement).innerHTML = '';
        setPlaying(false);
      }else{
        // _buildYoukuVideoPlayer(divId, obj);
      }
      if(isMobile && divId)  {
        buildretry();
      }
    }
  },[buildretry, divId,videoId, isMobile, obj, poster, rebuild])

  useEffect(() => {
    const mobile  = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    setIsMobile(mobile);
  },[])
  useEffect(() => {
      const u = window.navigator.userAgent;
      const android = u.indexOf('Android')> -1 || u.indexOf('Adr') > -1; //安卓终端
      setIsAndroid(android);
      if (!window.YKU || !YKU.Player) return
      if(isMobile){
        buildretry();
      }
  },[buildretry,isMobile, videoId, obj])

  useEffect(() => {
    /*微信静帧图 video 自动播放*/
    if(isMobile) {
      if (typeof window.WeixinJSBridge === "undefined") {
          //未执行WeixinJSBridge 开始监听 WeixinJSBridge
          document.addEventListener('WeixinJSBridgeReady', () => {
          if(playid.current){
            playid.current.play()
          }
          
          }, false);
        } else {
          //已经执行 使用 getNetworkType 调用获取网络类型后执行
          window.WeixinJSBridge.invoke("getNetworkType", {}, () => {
          if(playid.current){
            playid.current.play()
          }
          });
        }
    }
  },[playid,  isMobile,])
  useEffect(() => {
    if(!poster) {
      buildretry();
    }
  },[buildretry, videoId, obj, poster])
  const player = () => {
      setPlaying(true)
      buildretry();

  }

  const IS_POSTER_TYPE = postertype === 'video'; //静态帧视频模式
  return (
    <>
      <Script src="https://player.youku.com/jsapi" strategy="lazyOnload" />
      <div className={classNames(styles['video_player'],className)}  ref={divEle} >
            {
            IS_POSTER_TYPE ?
                isMobile ?
                !isAndroid ?
                      /*ios 静帧图视频 */
                    <div className={styles['videoplayer-preview-box']}>
                      <div className={styles['big-play-button']}></div>
                      <video  ref={playid} playsInline  autoPlay muted loop >
                        <source src={`${poster}.mp4`} />
                      </video>
                    </div>
                :null
                :
                <div className={styles['videoplayer-preview-box']} onClick={() => player()}>
                  <div className={styles['big-play-button']}></div>
                  <video  ref={playid} playsInline  autoPlay muted loop >
                    <source src={`${poster}.mp4`} />
                  </video>
                </div> 
            :
            !isMobile &&  poster?
              <div className={styles['videoplayer-preview-box']} onClick={() => player()}><div className={styles['big-play-button']}></div><div className={styles.pic}><AliImage src={poster} fill alt="" sizes="100vw" thumbnail /></div></div>
            :null
            }
          <div id={`${divId}`}  className={styles.videoBox} style={{"zIndex":playing?100:"inherit"}}></div>
      </div>
    </>
  )
}

export default YoukuPlayers
