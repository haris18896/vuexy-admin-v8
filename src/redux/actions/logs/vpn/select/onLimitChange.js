import { PAGE_CHANGE_LIST_LOGS, SELECT_CHANGE_LOGS_LIST } from '../../../actionType/logs/fetch'
import { handleFetchVpnConnectionLogs } from '../fetch'

export const handleSelectChangeListLogs = (
  newLimit,
  oldLimit,
  continentFilter,
  countryIdFilter,
  protocolFilter,
  connectionTimeFromFilter,
  connectionTimeToFilter,
  searchKeyword
) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch({ type: SELECT_CHANGE_LOGS_LIST, payload: newLimit })
      dispatch({ type: PAGE_CHANGE_LIST_LOGS, payload: 1 })
      dispatch(
        handleFetchVpnConnectionLogs(
          1,
          newLimit,
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
}
