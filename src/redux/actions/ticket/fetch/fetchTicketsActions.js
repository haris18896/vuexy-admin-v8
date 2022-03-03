import useJwt from "@src/auth/jwt/useJwt"
import { FETCH_TICKETS_INITIATED, FETCH_TICKETS_SUCCESS, FETCH_TICKETS_INITIATED_NO_UPDATES_VERSION, 
  FETCH_TICKETS_SUCCESS_NO_UPDATES_VERSION } from "../../actionType/ticket/fetch"

export const fetchTicketsInitiated = () => ({ type: FETCH_TICKETS_INITIATED })
  
export const fetchTicketsSuccess = (data) => ({ type: FETCH_TICKETS_SUCCESS, payload: data })

export const fetchTicketsNoUpdatesVersionInitiated = () => ({ type: FETCH_TICKETS_INITIATED_NO_UPDATES_VERSION })

export const fetchTicketsSuccessNoUpdatesVersion = (data) => ({ type: FETCH_TICKETS_SUCCESS_NO_UPDATES_VERSION, payload: data })

export const handleTicketsFetch = (
  page,
  limit,
  severityFilter, 
  statusFilter, 
  searchKeyword
) => {
  return async (dispatch) => {
    try {
      dispatch(fetchTicketsInitiated())
      const response = await useJwt.getSupportTickets(
        page,
        limit,
        severityFilter, 
        statusFilter, 
        searchKeyword
      )
      if (response && response.data) {
        dispatch(fetchTicketsSuccess(response.data))
      }
    } catch (err) {
      if (err.response?.data) {
        console.log(err.response.data)
      }
    }
  }
}

export const handleTicketsFetchNoUpdatesVersion = (
  page,
  limit,
  severityFilter, 
  statusFilter, 
  searchKeyword
) => {
  return async (dispatch) => {
    try {
      dispatch(fetchTicketsNoUpdatesVersionInitiated())
      const response = await useJwt.getSupportTickets(
        page,
        limit,
        severityFilter, 
        statusFilter, 
        searchKeyword
      )
      if (response && response.data) {
        dispatch(fetchTicketsSuccessNoUpdatesVersion(response.data))
      }
    } catch (err) {
      if (err.response?.data) {
        console.log(err.response.data)
      }
    }
  }
}

