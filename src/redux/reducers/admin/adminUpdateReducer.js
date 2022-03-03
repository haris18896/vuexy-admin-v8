import {
  FETCH_ADMIN_INITIATED,
  FETCH_ADMIN_SUCCESS,
} from "../../actions/actionType/admin/fetch"

import {
  UPDATE_ADMIN_FAILED,
  UPDATE_ADMIN_INITIATED,
  UPDATE_ADMIN_SUCCESS,
  RESET_STATE
} from "../../actions/actionType/admin/update"

export const adminUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ADMIN_INITIATED: {
      return { ...state, inProcess: true }
    }

    case FETCH_ADMIN_SUCCESS: {
      return {
        ...state,
        inProcess: false,
        profile: action.payload.profile,
        error: null
      }
    }

    case UPDATE_ADMIN_INITIATED: {
      return {
        ...state,
        profileUpdationInProcess: true,
      }
    }

    case UPDATE_ADMIN_SUCCESS: {
      return {
        ...state,
        profileUpdationInProcess: false,
        success: true,
        error: null
      }
    }

    case UPDATE_ADMIN_FAILED: {
      return {
        ...state,
        profileUpdationInProcess: false,
        success: false,
        error: action.payload,
      }
    }

    case RESET_STATE: {
      return {
        ...state,
        success: false,
        error: null,
      }
    }

    default: {
      return state
    }
  }
}
