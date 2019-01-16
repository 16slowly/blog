/**
 * @see https://github.com/vivedu/VIVEDU-Homepage/issues/55
 */

import React from 'react'
import cx from 'classnames'
import styles from './Button.scss'

class Button extends React.Component {
  render() {
    const {
      className,
      onDoubleClick,
      onClick,
      disabled,
      children,
      ...rest
    } = this.props

    // @see https://github.com/vivedu/VI-Classroom-Teacher/issues/353
    const handler = (e) => {
      // NOTE: e.target 不一定是 button，通常是 children，因此需要调用 button.blur
      this.button.blur()

      const handleClick = onDoubleClick || onClick
      handleClick(e)
    }

    return (
      <button
        {...rest}
        className={cx(className, styles.root)}
        ref={button => (this.button = button)}
        onClick={!onDoubleClick ? handler : undefined}
        onDoubleClick={onDoubleClick ? handler : undefined}
        disabled={disabled}
      >
        {children}
      </button>
    )
  }
}
export default Button
