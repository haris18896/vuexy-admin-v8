/* eslint-disable */
import useJwt from '@src/auth/jwt/useJwt'
import { FETCH_BLOCKEDAPPS_SETTINGS_INITIATED, FETCH_BLOCKEDAPPS_SETTINGS_SUCCESS } from '../../../../actionType/settings/fetch/blockedapps'

export const initiateFetchBlockedAppsSettings = () => ({ type: FETCH_BLOCKEDAPPS_SETTINGS_INITIATED })

export const fetchBlockedAppsSettingsSuccess = data => ({ type: FETCH_BLOCKEDAPPS_SETTINGS_SUCCESS, payload: data })

export const handleFetchBlockedAppsSettings = () => {
  return async dispatch => {
    try {
      dispatch(initiateFetchBlockedAppsSettings())
      const response = await useJwt.getBlockedAppsSettings()
      if (response && response.data) {
        dispatch(fetchBlockedAppsSettingsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}