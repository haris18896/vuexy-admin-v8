import useJwt from '@src/auth/jwt/useJwt'
import { DISABLE_SUBSCRIPTION_INITIATED, DISABLE_SUBSCRIPTION_SUCCESS } from '../../actionType/subscription/fetch'
import { handleSubscriptionsFetch } from '../fetch'

export const initiateDisableSubscription = () => ({ type: DISABLE_SUBSCRIPTION_INITIATED })

export const disableSubscriptionSuccess = (data) => ({ type: DISABLE_SUBSCRIPTION_SUCCESS, payload: data })

export const handleDisableSubscription = (
  customerId,
  page,
  limit,
  statusFilter,
  autoRenewalFilter,
  onTrialFilter,
  planIdFilter,
  startTimeFromFilter,
  startTimeToFilter,
  expiryTimeFromFilter,
  expiryTimeToFilter,
  searchKeyword
) => {
  return async dispatch => {
    try {
      dispatch(initiateDisableSubscription())
      const response = await useJwt.disableSubscription(customerId)
      if (response && response.data) {
        dispatch(
          handleSubscriptionsFetch(
            page,
            limit,
            statusFilter,
            autoRenewalFilter,
            onTrialFilter,
            planIdFilter,
            startTimeFromFilter,
            startTimeToFilter,
            expiryTimeFromFilter,
            expiryTimeToFilter,
            searchKeyword
          )
        )
        dispatch(disableSubscriptionSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
