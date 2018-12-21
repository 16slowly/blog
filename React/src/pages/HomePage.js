import React from 'react'
import { Link } from 'react-router-dom'
import List from 'components/List'
import styles from './Homepage.scss'

export default () => (
  <div>
    <h1 className={styles.title}>React Components</h1>
    <div className={styles.list}>
      <Link className={styles.item} to="/list">
        无限滚动 &gt;
      </Link>
    </div>
  </div>
)
