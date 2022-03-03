import { PAGE_CHANGE_LIST_TRANSACTIONS } from '../../actionType/transaction/fetch'
import { handleTransactionsFetch } from '../fetch'

export const handlePageChangeListTransactions = (
  page,
  limit,
  modeFilter,
  statusFilter,
  planIdFilter,
  transactionTimeFromFilter,
  transactionTimeToFilter,
  searchKeyword
) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch({ type: PAGE_CHANGE_LIST_TRANSACTIONS, payload: newPage })
    dispatch(
      handleTransactionsFetch(
        newPage,
        limit,
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
