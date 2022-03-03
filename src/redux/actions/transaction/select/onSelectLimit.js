import { PAGE_CHANGE_LIST_TRANSACTIONS, SELECT_CHANGE_TRANSACTIONS_LIST } from '../../actionType/transaction/fetch'
import { handleTransactionsFetch } from '../fetch'

export const handleSelectChangeListTransactions = (
  newLimit,
  oldLimit,
  modeFilter,
  statusFilter,
  planIdFilter,
  transactionTimeFromFilter,
  transactionTimeToFilter,
  searchKeyword
) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch({ type: SELECT_CHANGE_TRANSACTIONS_LIST, payload: newLimit })
      dispatch({ type: PAGE_CHANGE_LIST_TRANSACTIONS, payload: 1 })
      dispatch(
        handleTransactionsFetch(
          1,
          newLimit,
          modeFilter,
          statusFilter,
          planIdFilter,
          transactionTimeFromFilter,
          transactionTimeToFilter,
          searchKeyword
        )
      )
    }
  }
}
