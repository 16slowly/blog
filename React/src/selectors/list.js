/**
 * @see https://github.com/vivedu/VIVEDU-Store/issues/382
 */

import { createSelector } from 'reselect'
import { fromJS } from 'immutable'

const selectListDomain = state => state.get('list')

const selectListEntity = createSelector(selectListDomain, list =>
  list.get('entities')
)

export const selectCurrentPage = createSelector(selectListDomain, list =>
  list.get('currentPage')
)

export const selectTotalPage = createSelector(selectListDomain, list =>
  list.get('totalPage')
)

export const selectPages = createSelector(selectListDomain, list =>
  list.get('pages')
)

export const selecListItemIds = createSelector(
  selectPages,
  selectCurrentPage,
  (pages, currentPage) =>
    pages
      .keySeq()
      .filter(page => page < currentPage + 1)
      .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
      .reduce(
        (previous, current) => previous.concat(pages.get(current)),
        fromJS([])
      )
)

export const selectList = createSelector(
  selectListEntity,
  selecListItemIds,
  (entities, listIds) => listIds.map(id => entities.get(`${id}`))
)
