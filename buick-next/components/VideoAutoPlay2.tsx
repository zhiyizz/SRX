import React,{useState,useEffect} from 'react';
import type { KvMediaType } from '~types/slider';
import classNames from 'classnames';
import { useSelector } from 'lib/redux';
const VideoAutoPlay = ({styles,prefix,data,setVideoShow,videoShow}:{
    /**
   * 组件的 CSS Modules 样式对象。
   */
  styles?: { readonly [key: string ]: string }
  /**
   * URL路径
   */
  prefix:string,
  data:KvMediaType | KvMediaType[]
  videoShow?:boolean
  setVideoShow?:(arg:boolean) => void
}) => {
  /**数据0为PC端 1位移动端 */
  const [isWeChat, setisWechat] = useState<boolean>(false);
  const [isAndroid, setIsAndroid] = useState<boolean>(false);

  const isMobile = useSelector(state => state.global.isMobile)

  useEffect(() => {
    const ua = navigator.userAgent;
    const android = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //安卓终端
    const isWeixin = ua.toLowerCase().indexOf('micromessenger') != -1;
    const isIos = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    android ? setIsAndroid(true) : setIsAndroid(false);
    isMobile && isIos && isWeixin && setisWechat(true)
  }, [isMobile])

  let pcSrc: string | undefined
  let mobSrc: string | undefined


  if (Array.isArray(data)) {
    const pc = data.find(m => m.device === 'pc')
    if (pc) {
      pcSrc = pc.url
    }
    const mob = data.find(m => m.device === 'mob')
    if (mob) {
      mobSrc = mob.url
    }
  } else {
    mobSrc = data.url
  }

  return (
    <>
    {Array.isArray(data) && (
          typeof isMobile === 'boolean' && <video src={isMobile ? `${prefix}/${mobSrc}.mp4` : `${prefix}/${pcSrc}.mp4`} poster={isMobile ? isWeChat && !isAndroid ? `${prefix}/${mobSrc}.mp4` :  `${prefix}/${mobSrc}.webp` : undefined} playsInline muted autoPlay loop></video>
    )}
    {Array.isArray(data) && videoShow && <VideoOverlay styles={styles!} data={data} isMobile={isMobile} prefix={prefix} videoShow={videoShow} setVideoShow={setVideoShow!} />}
    </>
  );
};


const VideoOverlay = ({styles,data,isMobile,prefix,setVideoShow}:{
  styles: { readonly [key: string ]: string }
  data:KvMediaType[]
  isMobile:boolean | undefined
  prefix:string,
  videoShow:boolean
  setVideoShow:(arg:boolean) => void
}) => {
  const [show,setShow] = useState<boolean>();
  //const videoEl =  useRef<HTMLVideoElement>(null!);
   useEffect(() => {
    if(data){
      setTimeout(() => {
        setShow(true)
      },200)
    }
   },[data])


  let pcSrc: string | undefined
  let mobSrc: string | undefined

   console.log(data)
  if (Array.isArray(data)) {
    const pc = data.find(m => m.device === 'pc')
    if (pc) {
      pcSrc = pc.overlayUrl
    }
    const mob = data.find(m => m.device === 'mob')
    if (mob) {
      mobSrc = mob.overlayUrl
    }
  }


   return (
    <div className={classNames(styles.videoOverlay,{
      [styles.open]:show
    })}>
      <div className={styles.close} onClick={() => {
       setShow(false)
       setTimeout(() => {
        setVideoShow(false)
       },500)
      }}></div>
      <video playsInline controls webkit-playsinline="true" x5-video-player-type="h5" autoPlay loop={true} src={isMobile ? `${prefix}/${mobSrc}` : `${prefix}/${pcSrc}`} ></video>
    </div>
   )
}

export default VideoAutoPlay;
