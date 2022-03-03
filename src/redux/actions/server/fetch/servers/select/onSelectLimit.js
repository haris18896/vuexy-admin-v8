import { PAGE_CHANGE_LIST_SERVERS, SELECT_CHANGE_SERVERS_LIST } from '../../../../actionType/server/filters'
import { handleServersFetch } from '../fetch'

export const handleSelectChangeListServers = (
  newLimit,
  oldLimit,
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
    if (newLimit !== oldLimit) {
      dispatch(
        handleServersFetch(
          1,
          newLimit,
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

      dispatch({ type: SELECT_CHANGE_SERVERS_LIST, payload: newLimit })

      dispatch({ type: PAGE_CHANGE_LIST_SERVERS, payload: 1 })
    }
  }
}
