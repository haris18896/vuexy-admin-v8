import useJwt from "@src/auth/jwt/useJwt"
import { FETCH_ADMIN_INITIATED, FETCH_ADMIN_SUCCESS } from "../../actionType/admin/fetch"

export const fetchAdminInitiated = () => ({ type: FETCH_ADMIN_INITIATED })

export const fetchAdminSuccess = (data) => ({ type: FETCH_ADMIN_SUCCESS, payload: data })

export const handleFetchAdmin = (id) => {
  return async (dispatch) => {
    try {
      dispatch(fetchAdminInitiated())
      const response = await useJwt.getAdmin(id)
      if (response && response.data) {
        dispatch(fetchAdminSuccess(response.data))
      }
    } catch (err) {
      if (err.response?.data) {
        console.log(err.response.data)
      }
    }
  }
}
