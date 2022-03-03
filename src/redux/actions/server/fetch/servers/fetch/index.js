import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_SERVERS_INITIATED,
  FETCH_SERVERS_INITIATED_NO_UPDATES_VERSION,
  FETCH_SERVERS_SUCCESS,
  FETCH_SERVERS_SUCCESS_NO_UPDATES_VERSION,
} from "../../../../actionType/server/fetch/servers"

export const fetchServersSuccess = (data) => ({ type: FETCH_SERVERS_SUCCESS, payload: data })

export const handleServersFetch = (
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
  return async (dispatch) => {
    dispatch({ type: FETCH_SERVERS_INITIATED })
    try {
      const response = await useJwt.getServers(
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
      )
      if (response && response.data) {
        dispatch(fetchServersSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}

export const handleServersFetchNoUpdatesVersion = (
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
  return async (dispatch) => {
    dispatch({ type: FETCH_SERVERS_INITIATED_NO_UPDATES_VERSION })
    try {
      const response = await useJwt.getServers(
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
      )
      if (response && response.data) {
        dispatch({
          type: FETCH_SERVERS_SUCCESS_NO_UPDATES_VERSION,
          payload: response.data,
        })
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
