import classNames from 'classnames'

import styles from '../../styles/components/series-overlay.module.scss'

export type SeriesOverlayProps = {
  show?: boolean
  closing?: boolean
  rotate?: boolean
  onClose: VoidFunction
  onClosed?: VoidFunction
}

export default function Overlay({ children, show = false, closing = false, rotate = false, onClose, onClosed }: React.PropsWithChildren<SeriesOverlayProps>) {
  return (
    <div className={classNames(styles.overlay, {
      [styles.visible]: show,
      [styles.closing]: closing,
    })} onAnimationEnd={onClosed && (() => {
      if (closing) {
        onClosed()
      }
    })}>
      <div className={classNames({
        [styles['overlay-rotate']]: rotate,
        [styles['overlay-normal']]: !rotate,
        'animate__animated': show,
        'animate__slideInDown': show && !closing,
        'animate__slideOutUp': closing,
        'animate__fast': show,
      })}>
        <a className={styles.close} onClick={onClose}><i className="icon-close"></i></a>
        {children}
      </div>
    </div>
  )
}
