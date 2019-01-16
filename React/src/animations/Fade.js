/**
 * @see https://github.com/vivedu/VIVEDU-Homepage/issues/78
 */

import React from 'react'
import cx from 'classnames'
import styles from './Fade.scss'

const Fade = ({ status, children, ...rest }) => (
  <div className={cx(styles.root, styles[status])} {...rest}>
    {children}
  </div>
)

export default Fade
