import useJwt from "@src/auth/jwt/useJwt"
import { FETCH_VPN_CONNECTION_LOGS_INITIATED, FETCH_VPN_CONNECTION_LOGS_INITIATED_NO_UPDATES_VERSION,
  FETCH_VPN_CONNECTION_LOGS_SUCCESS, FETCH_VPN_CONNECTION_LOGS_SUCCESS_NO_UPDATES_VERSION } from "../../../actionType/logs/fetch"

export const initiateFetchVpnConnectionLogs = () => ({ type: FETCH_VPN_CONNECTION_LOGS_INITIATED })

export const fetchVpnConnectionLogsSuccess = (data) => ({ type: FETCH_VPN_CONNECTION_LOGS_SUCCESS, payload: data })

export const initiateFetchVpnConnectionLogsNoUpdatesVersion = () => ({ type: FETCH_VPN_CONNECTION_LOGS_INITIATED_NO_UPDATES_VERSION })

export const fetchVpnConnectionLogsSuccessNoUpdatesVersion = (data) => ({ type: FETCH_VPN_CONNECTION_LOGS_SUCCESS_NO_UPDATES_VERSION, payload: data })

export const handleFetchVpnConnectionLogs = (
  page,
  limit,
  continentFilter,
  countryIdFilter,
  protocolFilter,
  connectionTimeFromFilter,
  connectionTimeToFilter,
  searchKeyword
) => {
  return async (dispatch) => {
    try {
      dispatch(initiateFetchVpnConnectionLogs())
      const response = await useJwt.getVPNConnectionLogs(
        page,
        limit,
        continentFilter,
        countryIdFilter,
        protocolFilter,
        connectionTimeFromFilter,
        connectionTimeToFilter,
        searchKeyword
      )
      if (response && response.data) {
        dispatch(fetchVpnConnectionLogsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}

export const handleLogsFetchNoUpdatesVersion = (
  page,
  limit,
  continentFilter,
  countryIdFilter,
  protocolFilter,
  connectionTimeFromFilter,
  connectionTimeToFilter,
  searchKeyword
) => {
  return async (dispatch) => {
    try {
      dispatch(initiateFetchVpnConnectionLogsNoUpdatesVersion())
      const response = await useJwt.getVPNConnectionLogs(
        page,
        limit,
        continentFilter,
        countryIdFilter,
        protocolFilter,
        connectionTimeFromFilter,
        connectionTimeToFilter,
        searchKeyword
      )
      if (response.data) {
        dispatch(fetchVpnConnectionLogsSuccessNoUpdatesVersion(response.data))
      }
    } catch (err) {
      if (err.response?.data) {
        console.log(err.response.data)
      }
    }
  }
}
