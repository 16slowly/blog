/**
 * @see https://github.com/vivedu/VIVEDU-Homepage/issues/58
 */

import React from 'react'
import cx from 'classnames'
import styles from './SlideOutFromRightWithMask.scss'

const SlideOutFromRightWithMask = ({ status, children, ...rest }) => (
  <div
    className={cx(styles.root, styles[status])}
    {...rest}
  >
    <div className={styles.content}>
      {children}
    </div>
    <div className={styles.mask} />
  </div>
)

export default SlideOutFromRightWithMask
