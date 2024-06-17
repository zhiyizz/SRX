import React, { type FC, ReactNode, useEffect,useRef } from 'react';
import { delay, motion, useAnimation,useInView } from "framer-motion";

type motionProps = {
  children?: ReactNode
  className?: string

}

const MotionDiv: FC<motionProps> = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const control = useAnimation();
  const boxVariant = {
    visible: { opacity: 1, y:0,   transition: { duration: 0.5} },
    hidden: { opacity: 0, y:50, transition:{delay:1}  }
  };

   useEffect(() => {
    if (isInView) {
      control.start("visible");
    }else {
      control.start("hidden");
    }
  }, [control, isInView]);

  return (
    <motion.div
      className={className}
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
    >
    {children}
    </motion.div>
    
  );
};

export default MotionDiv;