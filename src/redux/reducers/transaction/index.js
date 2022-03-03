import {
  FETCH_TRANSACTIONS_INITIATED,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_SUCCESS_NO_UPDATES_VERSION,
  PAGE_CHANGE_LIST_TRANSACTIONS,
  SELECT_CHANGE_TRANSACTIONS_LIST,
  RESET_TRANSACTIONS_LIST_STATE,
} from "../../actions/actionType/transaction/fetch"

export const transactionsListReducer = (
  state = {
    page: 1,
    limit: 10,
    totalRecords: 0
  },
  action
) => {
  switch (action.type) {
    case FETCH_TRANSACTIONS_INITIATED: {
      return { ...state, inProcess: true }
    }

    case FETCH_TRANSACTIONS_SUCCESS: {
      return {
        ...state,
        inProcess: false,
        transactionsListData: action.payload,
        totalPages: action.payload.totalPages,
        totalRecords: action.payload.transactionsCount
      }
    }

    case FETCH_TRANSACTIONS_SUCCESS_NO_UPDATES_VERSION: {
      return {
        ...state,
        transactionsListData: action.payload,
        totalPages: action.payload.totalPages,
        totalRecords: action.payload.transactionsCount
      }
    }

    case SELECT_CHANGE_TRANSACTIONS_LIST: {
      return { ...state, limit: action.payload }
    }

    case PAGE_CHANGE_LIST_TRANSACTIONS: {
      return { ...state, page: action.payload }
    }

    case RESET_TRANSACTIONS_LIST_STATE: {
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
