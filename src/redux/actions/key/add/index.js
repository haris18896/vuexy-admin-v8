import useJwt from "@src/auth/jwt/useJwt"
import { ADD_SSH_KEY_FAILED, ADD_SSH_KEY_INITIATED, ADD_SSH_KEY_SUCCESS } from "../../actionType/key/add"

export const initiateAddSSHKey = () => ({ type: ADD_SSH_KEY_INITIATED })

export const addSSHKeySuccess = (data) => ({ type: ADD_SSH_KEY_SUCCESS, payload: data })

export const handleAddSSHKey = (data) => {
  return async (dispatch) => {
    try {
      dispatch(initiateAddSSHKey())
      const response = await useJwt.addSSHKey(data)
      if (response && response.data) {
        dispatch(addSSHKeySuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
        dispatch({ type: ADD_SSH_KEY_FAILED, payload: err.response.data })
      }
    }
  }
}
