import type { FC } from 'react'

import styles from '../../styles/components/series-overlay.module.scss'

import Loan, { type LoanProperties } from '@components/Loan'
import Overlay, { type SeriesOverlayProps } from './Overlay'

const LoanOverlay: FC<SeriesOverlayProps & LoanProperties> = ({ code, name, pic, reverseModel, ...rest }) => {

  if (!rest.show) return null

  return (
    <Overlay {...rest}>
      <div className={styles.container}>
        <Loan code={code} name={name} pic={pic} reverseModel={reverseModel} altStyles={styles} />
      </div>
    </Overlay>
  )
}

export default LoanOverlay
