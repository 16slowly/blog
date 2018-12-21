/**
 * @see https://github.com/16slowly/blog/issues/14
 */

import { createAction } from 'redux-actions'
import request from 'lib/request'

export const FETCH_LIST = 'APP/FETCH_LIST'
export const fetchList = createAction(
  FETCH_LIST,
  ({ page = 0, pageSize = 7 }) =>
    request('/api/list', {
      method: 'POST',
      body: {
        pageSize,
        page,
      },
    }).then(({ total_count, item }) => ({
      content: item.reduce(
        (previous, { content: { news_item, update_time } }) =>
          previous.concat(
            news_item.map(
              // NOTE: 后台返回了过多的无用数据，这里只取满足页面需求的数据
              ({ title, digest, author, thumb_url, url }) => ({
                id: url,
                title,
                author: author || 'Shayanglan',
                // eslint-disable-next-line camelcase
                date: update_time * 1000,
                thumbnail: thumb_url,
                abstract: digest,
                detail: url,
              })
            )
          ),
        []
      ),
      page,
      // eslint-disable-next-line camelcase
      totalPage: Math.ceil(total_count / pageSize),
    }))
)
