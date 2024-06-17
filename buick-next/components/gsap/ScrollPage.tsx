
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Scrollbar from 'smooth-scrollbar';
import { useEffect, useRef } from 'react';
import type { ReactElement } from 'react';
import classNames from 'classnames';
gsap.registerPlugin(ScrollTrigger);
 function ScrollPage({ children, className }: { children: ReactElement | ReactElement[], className?: string, }) {
  const scroller = useRef<HTMLElement>(null!);
  const bodyScrollBar = useRef<Scrollbar>(null!);
   useEffect(() => {
     // if (isMobile()) {
     //   console.log("mobile");
     // } else {
     //     console.log("pc");
     // }

     // function isMobile() {
     //     let flag = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
     //     return flag;
     // }
     function scrollInit(){
       scroller.current = document.querySelector(".scroller")!;
       bodyScrollBar.current = Scrollbar.init(scroller.current, {
         damping: 0.03, 
         delegateTo: document,
         alwaysShowTracks: true,
       });
       ScrollTrigger.scrollerProxy(scroller.current, {
         scrollTop(value) {
           if (arguments.length && value) {
             bodyScrollBar.current.scrollTop = value;
           }
           return bodyScrollBar.current.scrollTop;
         }
       });
       bodyScrollBar.current.addListener(ScrollTrigger.update);
       ScrollTrigger.defaults({ scroller: scroller.current });
       bodyScrollBar.current.track.xAxis.element.remove();
       // bodyScrollBar.current.track.yAxis.element.remove();
     }
     scrollInit();
     ScrollTrigger.addEventListener("refresh", () => scrollInit());
   }, [])
  return (
    <>

       <style global jsx>{`
            html,body  {
                overflow:hidden;
            }
            body {
                height:100%;

            }
            .scroller {
                height:100vh;

            }
            .scroll-content {
              -webkit-overflow-scrolling: touch;
            }
            @media screen  and (max-width:768px) {
              .scrollbar-track {
                width:4px;
                right:1px;
                background:none;
              }
              .scrollbar-thumb {
                width:4px;
                border-radius:0;
              }
            }
            
        `}

      </style>
      <div className={classNames(className,'scroller')}>
        {children}
      </div>
    </>
  )
}

export default ScrollPage
