import useJwt from "@src/auth/jwt/useJwt"
import { DELETE_ADMIN_INITIATED, DELETE_ADMIN_SUCCESS } from "../../actionType/admin/delete"
import { handleAdminsFetch } from "../fetch.admins/fetchAdminsActions"

export const deleteAdminInitiated = () => ({ type: DELETE_ADMIN_INITIATED })

export const deleteAdminSuccess = () => ({ type: DELETE_ADMIN_SUCCESS })

export const handleDeleteAdmin = (adminId, page, limit, searchKeyword) => {
  return async (dispatch) => {
    try {
      dispatch(deleteAdminInitiated())
      const response = await useJwt.deleteAdmin(adminId)
      if (response && response.data) {
        dispatch(deleteAdminSuccess())
        dispatch(handleAdminsFetch(page, limit, searchKeyword))
      }
    } catch (err) {
      if (err.response?.data) {
        console.log(err.response.data)
      }
    }
  }
}
