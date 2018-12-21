import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import cx from 'classnames'
import toJS from 'hocs/toJS'
import { fetchList } from 'actions/list'
import {
  selectList,
  selectCurrentPage,
  selectTotalPage,
} from 'selectors/list'
import ListItem from 'components/ListItem'
import styles from './List.scss'

const PAGESIZE = 7

class List extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      startIndex: 0,
      endIndex: 0,
      upperHeight: 0,
      underHeight: 0,
      loading: '正在加载中...',
    }

    this.cachedItemRect = []
    this.anchorItem = { index: 0, offset: 0 }
    this.displayCount = PAGESIZE
    this.beforeScrollY = 0
    this.averageHeight = 0
  }

  componentWillMount() {
    const { fetchList } = this.props

    fetchList({})
  }

  componentDidMount() {
    this.beforeScrollY = window.scrollY

    window.addEventListener('scroll', this.handleScrollEvent)
    window.addEventListener('resize', this.handleWindowResize)
  }

  setCache = (itemDom, itemIndex) => {
    const { upperHeight } = this.state
    const currentItem = this.cachedItemRect[itemIndex]
    const previousItem = this.cachedItemRect[itemIndex - 1]

    if (currentItem && currentItem.needAdjustment === false) return

    const rect = itemDom.getBoundingClientRect()
    const bottom = previousItem
      ? previousItem.bottom + rect.height
      : upperHeight + rect.height
    const top = previousItem ? previousItem.bottom : upperHeight

    this.cachedItemRect[itemIndex] = {
      index: itemIndex,
      top,
      bottom,
      height: rect.height,
      needAdjustment: false,
    }
  }

  componentWillUnMount() {
    window.removeEventListener('scroll', this.handleScrollEvent)
    window.removeEventListener('resize', this.handleWindowResize)
  }

  up = (scrollHeight) => {
    const { currentPage, totalPage } = this.props
    const anchorItemRect = this.cachedItemRect[this.anchorItem.index]
    const viewportHeight = document.documentElement.clientHeight

    if (this.container) {
      const listContainerHeight = this.container.clientHeight
      const scrolledHeight = scrollHeight + viewportHeight

      if (scrolledHeight >= listContainerHeight) {
        this.loadMore()
      }
    }

    // 滑动范围超过一个元素的高度之后再处理
    if (scrollHeight > anchorItemRect.bottom) {
      const itemIndex = this.cachedItemRect.findIndex(
        item => (item ? item.bottom > scrollHeight : false)
      )

      // 正常滑动速度
      if (itemIndex > 0) {
        // 多显示 3 个
        this.startIndex = itemIndex > 2 ? itemIndex - 3 : 0
        this.endIndex = (itemIndex + this.displayCount) + 3
        this.anchorItem.index = itemIndex
        this.anchorItem.offset = this.cachedItemRect[itemIndex].top
      }

      this.next()
    }
  }

  down = (scrollHeight) => {
    const anchorItemRect = this.cachedItemRect[this.anchorItem.index]

    if (scrollHeight < anchorItemRect.top) {
      const itemIndex = this.cachedItemRect.findIndex(
        item => (item ? item.top > scrollHeight : false)
      )

      if (itemIndex > 0) {
        // 多显示 3 个
        this.startIndex = itemIndex > 2 ? itemIndex - 3 : 0
        this.endIndex = itemIndex + this.displayCount + 3
        this.anchorItem.index = itemIndex
        this.anchorItem.offset = this.cachedItemRect[itemIndex].top
      }

      this.next()
    }
  }

  next = () => {
    const { list } = this.props
    const startItem = this.cachedItemRect[this.startIndex]
    const cachedItemRectLength = this.cachedItemRect.length
    let upperHeight = 0

    // 计算 item 的平均高度
    if (cachedItemRectLength > 0) {
      const totalHeight = this.cachedItemRect.reduce(
        (previous, current) => current.height + previous,
        0
      )

      this.averageHeight = Math.ceil(totalHeight / cachedItemRectLength)
    }

    if (startItem) {
      // 正常滑动速度
      upperHeight = startItem.top
    } else if (this.startIndex > 0) {
      // 滑动幅度太大， startItem 不存在， startIndex 又大于 0
      upperHeight =
        this.anchorItem.offset - (3 * this.averageHeight)
    }

    const unCachedItemCount = list.length - cachedItemRectLength
    const lastCachedItemRect = this.cachedItemRect[cachedItemRectLength - 1]
    const lastCachedItemRectBottom = lastCachedItemRect
      ? lastCachedItemRect.bottom
      : 0
    const lastItemRect =
      this.endIndex >= cachedItemRectLength
        ? this.cachedItemRect[cachedItemRectLength - 1]
        : this.cachedItemRect[this.endIndex]
    const lastItemRectBottom = lastItemRect ? lastItemRect.bottom : 0
    const underHeight =
      (lastCachedItemRectBottom - lastItemRectBottom) +
      (unCachedItemCount * this.averageHeight)

    this.setState({
      startIndex: this.startIndex,
      endIndex: this.endIndex,
      upperHeight,
      underHeight,
    })
  }

  handleScrollEvent = () => {
    const afterScrollY = window.scrollY
    const beforeScrollY = this.beforeScrollY
    const flag = afterScrollY - beforeScrollY

    if (flag === 0) return false

    if (flag > 0) {
      // 向上滑
      this.up(afterScrollY)
    } else {
      // 向下滑
      this.down(afterScrollY)
    }

    this.beforeScrollY = afterScrollY

    return false
  }

  handleWindowResize = () => {
    // TODO：Add adjust
  }

  loadMore = () => {
    const {
      totalPage,
      currentPage,
      fetchList,
    } = this.props

    this.setState({
      ...this.state,
      loading: !(currentPage === totalPage - 1)
        ? '正在加载中...'
        : '已经是最后一页了',
    })

    if (currentPage < totalPage - 1) {
      fetchList({ page: currentPage + 1 })
    }
  }

  render() {
    const { list } = this.props

    if (!(list.length > 0)) return null

    const {
      startIndex,
      endIndex,
      upperHeight,
      underHeight,
      loading,
    } = this.state
    const listDatas = list.slice(startIndex, endIndex || list.length)


    return (
      <div className={styles.container} ref={div => this.container = div}>
        <div className={styles.placeholder} style={{ height: upperHeight }} />
        {listDatas.map((data, index) => (
          <ListItem
            key={data.id}
            data={data}
            itemIndex={startIndex + index}
            setCache={this.setCache}
          />
        ))}
        <div className={styles.placeholder} style={{ height: underHeight }} />
        <div className={styles.loading}>{loading}</div>
      </div>
    )
  }
}

export default compose(
  connect(
    state => ({
      list: selectList(state),
      currentPage: selectCurrentPage(state),
      totalPage: selectTotalPage(state),
    }),
    { fetchList }
  ),
  toJS
)(List)
