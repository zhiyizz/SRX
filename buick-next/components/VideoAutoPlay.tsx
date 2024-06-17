import React, { useEffect, useRef, useState } from 'react';
import AliImage from './AlImage';

const VideoAutoPlay = (props: {
  data: { pc: string, m?: string },
  height?: number,
  width?: number,
}) => {
  const [userAgent, setuserAgent] = useState<boolean>();
  const videoEl = useRef<HTMLVideoElement>(null!);
  useEffect(() => {
    function size(){
      const u = navigator.userAgent;
      const android = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
      // let ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (android) {
        setuserAgent(true)
      }else{
        setuserAgent(false)
      }
    }
    size();
    window.onresize = function(){
      size();
    }
  }, [])

  useEffect(() => {
    const autoplay = () => {
      videoEl &&
        videoEl.current &&
        videoEl.current.play().catch((error) => {
          console.log("Error attempting to play" + error);
        });
    }
    if (!window.WeixinJSBridge) {
      //未执行WeixinJSBridge 开始监听 WeixinJSBridge
      document.addEventListener('WeixinJSBridgeReady', () => {
        autoplay();
      }, false);
    } else {
      //已经执行 使用 getNetworkType 调用获取网络类型后执行
      window.WeixinJSBridge.invoke("getNetworkType", {}, () => {
        autoplay();
      });
    }

  }, [])
  return (
    <>
     <style global jsx>{`
           .pc,.m {
            height:100%;
            position:relative;
           }

        `}

      </style>
      <div className='pc'>
        <video playsInline webkit-playsinline="true" x5-video-player-type="h5" autoPlay muted loop={true} ref={videoEl}>
          <source src={`${props.data.pc}.mp4`} />
        </video>
      </div>
      <div className='m'>
        {userAgent ? (
          <AliImage  src={`${props.data.m}.webp`} alt="" width={props.width || 750} height={props.height || 1448} />
        ) : (
          <video playsInline webkit-playsinline="true" x5-video-player-type="h5" autoPlay muted loop={true} ref={videoEl}>
            <source src={`${props.data.m}.mp4`} />
          </video>
        )}
      </div>
    </>
  );
};

export default VideoAutoPlay;
