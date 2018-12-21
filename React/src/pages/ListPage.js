import React from 'react'
import { Link } from 'react-router-dom'
import List from 'components/List'
import styles from './ListPage.scss'

export default () => (
  <div className="container">
    <div className={styles.title}>
      <h1>相关列表</h1>
      <Link className={styles.goback} to="/">&lt; 返回首页</Link>
    </div>
    <List />
  </div>
)
