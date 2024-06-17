import React,{useRef,useState} from 'react';
import styles from '@styles/components/videoPlayer.module.scss'
const VideoPlayer = ({ poster, video }: {
  poster: string
  video: string
}) => {
  const videoRef = useRef<HTMLVideoElement>(null!);
  const [hideButton,setHideButton] = useState(true);
  const player = () => {
    if(videoRef.current){
      if(!videoRef.current.paused) return;
      videoRef.current.play();
      setTimeout(() => {
        setHideButton(false);
      },100)
    }
  }
  return (
    <div className={styles.videoPlayer}  onClick={() => player()}>
      {hideButton && <div className={styles.playButton} ></div>}
      <video playsInline controls={!hideButton}   poster={poster} ref={videoRef} >
        <source src={video} />
      </video>
    </div>
  );
};

export default VideoPlayer;