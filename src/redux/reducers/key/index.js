import { ADD_SSH_KEY_FAILED, ADD_SSH_KEY_INITIATED, ADD_SSH_KEY_SUCCESS, RESET_SSH_KEY_STATE } from "../../actions/actionType/key/add"

const sshKeyReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SSH_KEY_INITIATED:
      return { inProcess: true }
    case ADD_SSH_KEY_SUCCESS:
      return { inProcess: false, success: action.payload.success }
    case ADD_SSH_KEY_FAILED:
      return { inProcess: false, error: action.payload }
    case RESET_SSH_KEY_STATE:
      return {}
    default:
      return state
  }
}

export default sshKeyReducer
