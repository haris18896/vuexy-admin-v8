import { PAGE_CHANGE_LIST_LOGS } from '../../../actionType/logs/fetch'
import { handleFetchVpnConnectionLogs } from '../fetch'

export const handlePageChangeListLogs = (
  page,
  limit,
  continentFilter,
  countryIdFilter,
  protocolFilter,
  connectionTimeFromFilter,
  connectionTimeToFilter,
  searchKeyword
) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch({ type: PAGE_CHANGE_LIST_LOGS, payload: newPage })
    dispatch(
      handleFetchVpnConnectionLogs(
        newPage,
        limit,
        continentFilter,
        countryIdFilter,
        protocolFilter,
        connectionTimeFromFilter,
        connectionTimeToFilter,
        searchKeyword
      )
    )
  }
}
