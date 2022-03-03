/* eslint-disable */
import useJwt from '@src/auth/jwt/useJwt'
import { UPDATE_PAYMENT_SETTINGS_INITIATED, UPDATE_PAYMENT_SETTINGS_SUCCESS } from '../../../../actionType/settings/update/payment'

export const initiatePaymentUpdate = () => ({ type: UPDATE_PAYMENT_SETTINGS_INITIATED })

export const updatePaymentSettingsSuccess = data => ({ type: UPDATE_PAYMENT_SETTINGS_SUCCESS, payload: data })

export const handlePaymentUpdate = data => {
  return async dispatch => {
    try {
      dispatch(initiatePaymentUpdate())
      const response = await useJwt.updatePaymentSettings(data)
      if (response && response.data) {
        dispatch(updatePaymentSettingsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
