import {
  DISABLE_SUBSCRIPTION_INITIATED,
  DISABLE_SUBSCRIPTION_SUCCESS,
  ENABLE_SUBSCRIPTION_INITIATED,
  ENABLE_SUBSCRIPTION_SUCCESS,
  FETCH_SUBSCRIPTIONS_INITIATED,
  FETCH_SUBSCRIPTIONS_INITIATED_NO_UPDATES_VERSION,
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_SUCCESS_NO_UPDATES_VERSION,
  PAGE_CHANGE_LIST_SUBSCRIPTIONS,
  RESET_SUBSCRIPTIONS_LIST_STATE,
  SELECT_CHANGE_SUBSCRIPTIONS_LIST,
} from "../../actions/actionType/subscription/fetch"

export const subscriptionListFilter = (
  state = {
    page: 1,
    limit: 10,
    totalRecords: 0
  },
  action
) => {
  switch (action.type) {

    case FETCH_SUBSCRIPTIONS_INITIATED: {
      return { ...state, inProcess: true }
    }

    case FETCH_SUBSCRIPTIONS_SUCCESS: {
      return {
        ...state,
        inProcess: false,
        subscriptionsListData: action.payload,
        totalPages: action.payload.totalPages,
        totalRecords: action.payload.customersCount
      }
    }

    case SELECT_CHANGE_SUBSCRIPTIONS_LIST: {
      return {
        ...state,
        limit: action.payload,
      }
    }

    case PAGE_CHANGE_LIST_SUBSCRIPTIONS: {
      return {
        ...state,
        page: action.payload,
      }
    }

    case DISABLE_SUBSCRIPTION_INITIATED: {
      return {
        ...state,
        disableSubInProcess: true,
      }
    }

    case DISABLE_SUBSCRIPTION_SUCCESS: {
      return {
        ...state,
        disableSubInProcess: false,
      }
    }

    case ENABLE_SUBSCRIPTION_INITIATED: {
      return {
        ...state,
        enableSubInProcess: true,
      }
    }

    case ENABLE_SUBSCRIPTION_SUCCESS: {
      return {
        ...state,
        enableSubInProcess: false,
      }
    }

    case FETCH_SUBSCRIPTIONS_INITIATED_NO_UPDATES_VERSION: {
      return {
        ...state,
      }
    }

    case FETCH_SUBSCRIPTIONS_SUCCESS_NO_UPDATES_VERSION: {
      return {
        ...state,
        subscriptionsListData: action.payload,
        totalPages: action.payload.totalPages,
        totalRecords: action.payload.customersCount
      }
    }

    case RESET_SUBSCRIPTIONS_LIST_STATE: {
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
