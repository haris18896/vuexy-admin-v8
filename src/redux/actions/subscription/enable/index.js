import useJwt from "@src/auth/jwt/useJwt"
import {
  ENABLE_SUBSCRIPTION_INITIATED,
  ENABLE_SUBSCRIPTION_SUCCESS,
} from "../../actionType/subscription/fetch"
import { handleSubscriptionsFetch } from "../fetch"

export const initiateEnableSubscription = () => ({ type: ENABLE_SUBSCRIPTION_INITIATED })

export const enableSubscriptionSuccess = (data) => ({ type: ENABLE_SUBSCRIPTION_SUCCESS, payload: data })

export const handleEnableSubscription = (
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
  return async (dispatch) => {
    try {
      dispatch(initiateEnableSubscription())
      const response = await useJwt.enableSubscription(customerId)
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
        dispatch(enableSubscriptionSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
