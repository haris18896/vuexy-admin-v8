import useJwt from "@src/auth/jwt/useJwt"
import { handleTicketsFetch } from "../fetch/fetchTicketsActions"
import { CLOSE_SUPPORT_TICKET_INITIATED } from "../../actionType/ticket/close"

export const initiateCloseSupportTicket = () => ({ type: CLOSE_SUPPORT_TICKET_INITIATED })

export const handleCloseSupportTicket = (
  ticketId,
  page,
  limit,
  severityFilter, 
  statusFilter, 
  searchKeyword
) => {
  return async (dispatch) => {
    try {
      dispatch(initiateCloseSupportTicket())
      const response = await useJwt.closeSupportTicket(ticketId)
      if (response && response.data) {
        dispatch(
          handleTicketsFetch(
            page,
            limit,
            severityFilter, 
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
