/* eslint-disable */
import useJwt from '@src/auth/jwt/useJwt'
import { FETCH_INAPPUPDATE_SETTINGS_INITIATED, FETCH_INAPPUPDATE_SETTINGS_SUCCESS } from '../../../../actionType/settings/fetch/inappupdate'

export const initiateFetchInAppUpdateSettings = () => ({ type: FETCH_INAPPUPDATE_SETTINGS_INITIATED })

export const fetchInAppUpdateSettingsSuccess = data => ({ type: FETCH_INAPPUPDATE_SETTINGS_SUCCESS, payload: data })

export const handleFetchInAppUpdateSettings = () => {
  return async dispatch => {
    try {
      dispatch(initiateFetchInAppUpdateSettings())
      const response = await useJwt.getInAppUpdateSettings()
      if (response && response.data) {
        dispatch(fetchInAppUpdateSettingsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
