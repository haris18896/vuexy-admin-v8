import useJwt from "@src/auth/jwt/useJwt"
import { 
  FETCH_SUBSCRIPTIONS_INITIATED, 
  FETCH_SUBSCRIPTIONS_INITIATED_NO_UPDATES_VERSION,
  FETCH_SUBSCRIPTIONS_SUCCESS, 
  FETCH_SUBSCRIPTIONS_SUCCESS_NO_UPDATES_VERSION 
} from "../../actionType/subscription/fetch"

export const fetchSubscriptionsInitiated = () => ({ type: FETCH_SUBSCRIPTIONS_INITIATED })

export const fetchSubscriptionsSuccess = (data) => ({ type: FETCH_SUBSCRIPTIONS_SUCCESS, payload: data })

export const fetchSubscriptionsInitiatedNoUpdatesVersion = () => ({ type: FETCH_SUBSCRIPTIONS_INITIATED_NO_UPDATES_VERSION })

export const fetchSubscriptionsSuccessNoUpdatesVersion = (data) => ({ type: FETCH_SUBSCRIPTIONS_SUCCESS_NO_UPDATES_VERSION, payload: data })

export const handleSubscriptionsFetch = (
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
      dispatch(fetchSubscriptionsInitiated())
      const response = await useJwt.getSubscriptions(
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
      if (response && response.data) {
        dispatch(fetchSubscriptionsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}

export const handleSubscriptionsFetchNoUpdatesVersion = (
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
      dispatch(fetchSubscriptionsInitiatedNoUpdatesVersion())
      const response = await useJwt.getSubscriptions(
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
      if (response && response.data) {
        dispatch(fetchSubscriptionsSuccessNoUpdatesVersion(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}