import {
  FETCH_VPN_CONNECTION_LOGS_INITIATED,
  FETCH_VPN_CONNECTION_LOGS_SUCCESS,
  FETCH_VPN_CONNECTION_LOGS_SUCCESS_NO_UPDATES_VERSION,
  PAGE_CHANGE_LIST_LOGS,
  RESET_LOGS_LIST_STATE,
  SELECT_CHANGE_LOGS_LIST
} from "../../actions/actionType/logs/fetch"

export const vpnLogsReducer = (
  state = {
    page: 1,
    limit: 10,
    totalRecords: 0
  },
  action
) => {
  switch (action.type) {
    case FETCH_VPN_CONNECTION_LOGS_INITIATED: {
      return { ...state, inProcess: true }
    }
    case FETCH_VPN_CONNECTION_LOGS_SUCCESS: {
      return {
        ...state,
        inProcess: false,
        vpnConnectionLogData: action.payload,
        totalPages: action.payload.totalPages,
        totalRecords: action.payload.vpnConnectionLogsCount
      }
    }
    case FETCH_VPN_CONNECTION_LOGS_SUCCESS_NO_UPDATES_VERSION: {
      return {
        ...state,
        vpnConnectionLogData: action.payload,
        totalPages: action.payload.totalPages,
        totalRecords: action.payload.vpnConnectionLogsCount
      }
    }

    case SELECT_CHANGE_LOGS_LIST: {
      return { ...state, limit: action.payload }
    }

    case PAGE_CHANGE_LIST_LOGS: {
      return { ...state, page: action.payload }
    }

    case RESET_LOGS_LIST_STATE: {
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
