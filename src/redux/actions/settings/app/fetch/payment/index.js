/* eslint-disable */
import useJwt from '@src/auth/jwt/useJwt'
import { FETCH_PAYMENT_SETTINGS_INITIATED, FETCH_PAYMENT_SETTINGS_SUCCESS } from '../../../../actionType/settings/fetch/payment'

export const initiateFetchPaymentSettings = () => ({ type: FETCH_PAYMENT_SETTINGS_INITIATED })

export const fetchPaymentSettingsSuccess = data => ({ type: FETCH_PAYMENT_SETTINGS_SUCCESS, payload: data })

export const handleFetchPaymentSettings = () => {
  return async dispatch => {
    try {
      dispatch(initiateFetchPaymentSettings())
      const response = await useJwt.getPaymentSettings()
      if (response && response.data) {
        dispatch(fetchPaymentSettingsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
