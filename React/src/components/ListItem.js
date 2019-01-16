/**
 * @see https://github.com/16slowly/blog/issues/14
 */

import React from 'react'
import cx from 'classnames'
import { formatDate } from 'helpers/time.js'
import styles from './ListItem.scss'

class ListItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      backgroundColor: '#f2f2f2',
    }
  }

  componentWillMount() {
    this.img = new Image()
    this.img.src = this.props.data.thumbnail
  }

  componentDidMount() {
    const { setCache, itemIndex } = this.props

    if (this[`thumbnail${itemIndex}`]) {
      const thumbnailRect = this[`thumbnail${itemIndex}`]

      this.img.onload = () => {
        this.setState({ backgroundColor: 'transparent' })
        thumbnailRect.appendChild(this.img)
      }
    }

    setCache(this.item, itemIndex)
  }

  render() {
    const {
      className,
      itemIndex,
      data: { title, date, author, thumbnail, abstract, detail },
    } = this.props

    return (
      <a
        className={cx(styles.root, className)}
        ref={a => (this.item = a)}
        href={detail}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className={styles.thumbnail}
          ref={div => (this[`thumbnail${itemIndex}`] = div)}
          style={{ backgroundColor: this.state.backgroundColor }}
        />
        <div className={styles.description}>
          <h1 className={styles.title}>{title}</h1>
          <div
            className={styles.abstract}
            dangerouslySetInnerHTML={{
              __html: abstract,
            }}
          />
          <p className={styles.subtitle}>
            <span>时间：{formatDate(date)}</span>
            <span>作者：{author.name}</span>
          </p>
        </div>
      </a>
    )
  }
}

export default ListItem
