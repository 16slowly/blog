/**
 * @see https://github.com/vivedu/VIVEDU-Homepage/issues/45
 */

import React from 'react'
import cx from 'classnames'
import Button from 'components/Button'
import styles from './CardIndicator.scss'

const CardIndicator = ({ className, length, currentIndex, onClick }) => {
  const array = Array.from(new Array(length))

  if (length === 0) return null

  return (
    <div className={cx(styles.root, className)}>
      {array.map((_, index) => (
        <Button
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={cx(styles.cell, {
            [styles.active]: currentIndex === index,
          })}
          onClick={() => onClick(index)}
        >
          <span>{index + 1}</span>
        </Button>
      ))}
    </div>
  )
}

export default CardIndicator
