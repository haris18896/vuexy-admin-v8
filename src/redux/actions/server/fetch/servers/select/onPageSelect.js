import { PAGE_CHANGE_LIST_SERVERS } from '../../../../actionType/server/filters'
import { handleServersFetch } from '../fetch'

export const handlePageChangeListServers = (
  page,
  limit,
  countryIdFilter,
  cloudIdFilter,
  instanceTypeFilter,
  typeFilter,
  accessTypeFilter,
  protocolFilter,
  statusFilter,
  searchKeyword
) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch({ type: PAGE_CHANGE_LIST_SERVERS, payload: newPage })
    dispatch(
      handleServersFetch(
        newPage,
        limit,
        countryIdFilter,
        cloudIdFilter,
        instanceTypeFilter,
        typeFilter,
        accessTypeFilter,
        protocolFilter,
        statusFilter,
        searchKeyword
      )
    )
  }
}
