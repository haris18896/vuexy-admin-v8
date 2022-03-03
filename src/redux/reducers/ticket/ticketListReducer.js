import {
  FETCH_TICKETS_INITIATED,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_SUCCESS_NO_UPDATES_VERSION,
  SELECT_CHANGE_TICKETS_LIST,
  PAGE_CHANGE_LIST_TICKETS,
  RESET_TICKETS_LIST_STATE,
} from "../../actions/actionType/ticket/fetch"

export const ticketListReducer = (
  state = {
    page: 1,
    limit: 10,
    totalRecords: 0
  },
  action
) => {
  switch (action.type) {
    case FETCH_TICKETS_INITIATED: {
      return { ...state, inProcess: true }
    }
    case FETCH_TICKETS_SUCCESS: {
      return {
        ...state,
        inProcess: false,
        ticketsListData: action.payload,
        totalPages: action.payload.totalPages,
        totalRecords: action.payload.supportTicketsCount
      }
    }

    case FETCH_TICKETS_SUCCESS_NO_UPDATES_VERSION: {
      return {
        ...state,
        inProcess: false,
        ticketsListData: action.payload,
        totalPages: action.payload.totalPages,
        totalRecords: action.payload.supportTicketsCount
      }
    }

    case SELECT_CHANGE_TICKETS_LIST: {
      return { ...state, limit: action.payload, page: 1 }
    }

    case PAGE_CHANGE_LIST_TICKETS: {
      return { ...state, inProcess: true, page: action.payload }
    }

    case RESET_TICKETS_LIST_STATE: {
      return {
        page: 1,
        limit: 10,
        totalRecords: 0
      }
    }
    default: {
      return state
    }
  }
}
