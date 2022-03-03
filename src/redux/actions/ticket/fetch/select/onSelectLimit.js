import { PAGE_CHANGE_LIST_TICKETS, SELECT_CHANGE_TICKETS_LIST } from '../../../actionType/ticket/fetch'
import { handleTicketsFetch } from '../fetchTicketsActions'

export const handleSelectChangeListTickets = (newLimit, oldLimit, severityFilter, statusFilter, searchKeyword) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch({ type: SELECT_CHANGE_TICKETS_LIST, payload: newLimit })
      dispatch({ type: PAGE_CHANGE_LIST_TICKETS, payload: 1 })
      dispatch(handleTicketsFetch(1, newLimit, severityFilter, statusFilter, searchKeyword))
    }
  }
}
