import { PAGE_CHANGE_LIST_SUBSCRIPTIONS, SELECT_CHANGE_SUBSCRIPTIONS_LIST } from '../../actionType/subscription/fetch'
import { handleSubscriptionsFetch } from '../fetch'

export const handleSelectChangeListSubsciptions = (
  newLimit,
  oldLimit,
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
    if (newLimit !== oldLimit) {
      dispatch({ type: SELECT_CHANGE_SUBSCRIPTIONS_LIST, payload: newLimit })
      dispatch({ type: PAGE_CHANGE_LIST_SUBSCRIPTIONS, payload: 1 })
      dispatch(
        handleSubscriptionsFetch(
          1,
          newLimit,
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
    }
  }
}
