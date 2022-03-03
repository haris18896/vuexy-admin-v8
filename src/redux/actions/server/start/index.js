import useJwt from "@src/auth/jwt/useJwt"
import {
  START_SERVER_INITIATED,
  START_SERVER_SUCCESS,
} from "../../actionType/server/start"
import { handleServersFetch } from "../fetch/servers/fetch"

export const fetchServersSuccess = (data) => {
  return async (dispatch) => {
    dispatch({ type: START_SERVER_SUCCESS, payload: data })
  }
}

export const handleStartServer = (
  serverId,
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
    dispatch({ type: START_SERVER_INITIATED })
    try {
      const response = await useJwt.startServer(serverId)
      if (response && response.data) {
        dispatch({ type: START_SERVER_SUCCESS, payload: response.data })

        dispatch(
          handleServersFetch(
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
        )
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
