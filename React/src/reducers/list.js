/**
 * @see https://github.com/vivedu/VIVEDU-Store/issues/382
 */

import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'
import { FETCH_LIST } from 'actions/list'

const initialState = fromJS({
  entities: {},
  pages: {},
  currentPage: null,
  totalPage: null,
})

export default handleActions(
  {
    [`${FETCH_LIST}_FULFILLED`]: (
      state,
      { payload: { content, totalPage, page } }
    ) =>
      state
        .mergeDeepIn(
          ['entities'],
          fromJS(
            content.reduce(
              (previous, current) =>
                Object.assign(previous, { [current.id]: current }),
              {}
            )
          )
        )
        .mergeDeepIn(
          ['pages'],
          fromJS({ [page]: content.map(item => item.id) })
        )
        .set('currentPage', page)
        .set('totalPage', totalPage),
  },
  initialState
)
