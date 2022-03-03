import useJwt from "@src/auth/jwt/useJwt"
import {
  SELECT_CHANGE,
  PAGE_CHANGE,
  FETCH_ADMINS_INITIATED,
  FETCH_ADMINS_INITIATED_NO_UPDATES_VERSION,
  FETCH_ADMINS_SUCCESS,
  FETCH_ADMINS_SUCCESS_NO_UPDATES_VERSION,
} from "../../actionType/admin/fetch"

export const fetchAdminsSuccess = (data) => ({ type: FETCH_ADMINS_SUCCESS, payload: data })

export const fetchAdminsSuccessNoUpdatesVersion = (data) => ({ type: FETCH_ADMINS_SUCCESS_NO_UPDATES_VERSION, payload: data })

export const handleAdminsFetch = (page, limit, searchKeyword = null) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_ADMINS_INITIATED })
      const response = await useJwt.getAdmins(page, limit, searchKeyword)
      if (response.data) {
        dispatch(fetchAdminsSuccess(response.data))
      }
    } catch (err) {
      if (err.response?.data) {
        console.log(err.response.data)
      }
    }
  }
}

export const handleSelectChange = (newLimit, oldLimit, searchKeyword) => {
  return async (dispatch) => {
    if (newLimit !== oldLimit) {
      dispatch({ type: SELECT_CHANGE, payload: newLimit })
      dispatch({ type: PAGE_CHANGE, payload: 1 })
      dispatch(handleAdminsFetch(1, newLimit, searchKeyword))
    }
  }
}

export const handlePageChange = (page, limit, searchKeyword) => {
  return async (dispatch) => {
    const newPage = page.selected + 1
    dispatch({ type: PAGE_CHANGE, payload: newPage })
    dispatch(handleAdminsFetch(newPage, limit, searchKeyword))
  }
}

export const handleAdminsFetchNoUpdatesVersion = (
  page,
  limit,
  searchKeyword
) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_ADMINS_INITIATED_NO_UPDATES_VERSION })
      const response = await useJwt.getAdmins(page, limit, searchKeyword)
      if (response.data) {
        dispatch(fetchAdminsSuccessNoUpdatesVersion(response.data))
      }
    } catch (err) {
      if (err.response?.data) {
        console.log(err.response.data)
      }
    }
  }
}
