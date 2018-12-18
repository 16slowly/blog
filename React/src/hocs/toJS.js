/**
 * @see https://github.com/vivedu/VIVEDU-Homepage/issues/116
 */

import React from 'react'
import { isImmutable } from 'immutable' // 需要 immutable@4.0.0-rc.2
import getDisplayName from 'helpers/getDisplayName'

export default (Component) => {
  const toJS = (props) => {
    const parsedProps = Object.keys(props).reduce((previous, key) => {
      const value = props[key]

      return Object.assign(previous, {
        [key]: isImmutable(value) ? value.toJS() : value,
      })
    }, {})

    return <Component {...parsedProps} />
  }

  toJS.displayName = `toJS(${getDisplayName(Component)})`

  return toJS
}
