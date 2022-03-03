/* eslint-disable */
import useJwt from '@src/auth/jwt/useJwt'
import { UPDATE_INAPPUPDATE_SETTINGS_INITIATED, UPDATE_INAPPUPDATE_SETTINGS_SUCCESS } from '../../../../actionType/settings/update/inappupdate'

export const initiateInAppUpdateUpdate = () => ({ type: UPDATE_INAPPUPDATE_SETTINGS_INITIATED })

export const updateInAppUpdateSettingsSuccess = data => ({ type: UPDATE_INAPPUPDATE_SETTINGS_SUCCESS, payload: data })

export const handleInAppUpdate = data => {
  return async dispatch => {
    try {
      dispatch(initiateInAppUpdateUpdate())
      const response = await useJwt.updateInAppUpdateSettings(data)
      if (response && response.data) {
        dispatch(updateInAppUpdateSettingsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
