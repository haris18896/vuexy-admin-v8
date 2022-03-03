import { PAGE_CHANGE_LIST_TICKETS } from '../../../actionType/ticket/fetch'
import { handleTicketsFetch } from '../fetchTicketsActions'

export const handlePageChangeListTickets = (page, limit, severityFilter, statusFilter, searchKeyword) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch({ type: PAGE_CHANGE_LIST_TICKETS, payload: newPage })
    dispatch(handleTicketsFetch(newPage, limit, severityFilter, statusFilter, searchKeyword))
  }
}
