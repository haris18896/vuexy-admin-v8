import {
  INITIATE_REGISTRATION,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS,
  RESET_REGISTER_STATE,
} from "../../actions/actionType/admin/register"

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case INITIATE_REGISTRATION: {
      return { ...state, inProcess: true }
    }

    case REGISTRATION_FAILED: {
      return { ...state, inProcess: false, error: action.payload }
    }

    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        inProcess: false,
        success: action.payload.success,
      }
    }

    case RESET_REGISTER_STATE: {
      return {}
    }

    default: {
      return state
    }
  }
}
