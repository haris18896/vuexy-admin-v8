import useJwt from '@src/auth/jwt/useJwt'
import { FETCH_PLANS_INITIATED, FETCH_PLANS_SUCCESS } from '../../actionType/plans/fetch'

export const initiateFetchPlans = () => ({ type: FETCH_PLANS_INITIATED })

export const fetchPlansSuccess = data => ({ type: FETCH_PLANS_SUCCESS, payload: data })

export const handleFetchPlans = () => {
  return async dispatch => {
    dispatch(initiateFetchPlans())

    try {
      const response = await useJwt.getPlans()
      if (response && response.data) {
        dispatch(fetchPlansSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
