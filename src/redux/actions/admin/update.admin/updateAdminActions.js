import useJwt from '@src/auth/jwt/useJwt'
import { UPDATE_ADMIN_INITIATED, UPDATE_ADMIN_SUCCESS, UPDATE_ADMIN_FAILED, 
  RESET_STATE } from '../../actionType/admin/update'

export const updateAdminInitiated = () => ({ type: UPDATE_ADMIN_INITIATED })

export const updateAdminSuccess = data => ({ type: UPDATE_ADMIN_SUCCESS, payload: data })

export const updateAdminFailed = data => ({ type: UPDATE_ADMIN_FAILED, payload: data })

export const handleUpdateAdmin = (id, data) => {
  return async dispatch => {
    try {
      dispatch(updateAdminInitiated())
      const response = await useJwt.updateAdmin(id, data)
      if (response.data) {
        dispatch(updateAdminSuccess(response.data))
      }
    } catch (err) {
      if (err.response?.data) {
        dispatch(updateAdminFailed(err.response?.data))
      }
    }
  }
}

export const resetState = () => ({ type: RESET_STATE })
