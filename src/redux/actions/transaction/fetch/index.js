import useJwt from "@src/auth/jwt/useJwt"
import { FETCH_TRANSACTIONS_INITIATED, FETCH_TRANSACTIONS_SUCCESS, FETCH_TRANSACTIONS_INITIATED_NO_UPDATES_VERSION,
  FETCH_TRANSACTIONS_SUCCESS_NO_UPDATES_VERSION } from "../../actionType/transaction/fetch"

export const initiateFetchTransactions = () => ({ type: FETCH_TRANSACTIONS_INITIATED })

export const fetchTransactionsSuccess = (data) => ({ type: FETCH_TRANSACTIONS_SUCCESS, payload: data })

export const initiateFetchTransactionsNoUpdatesVersion = () => ({ type: FETCH_TRANSACTIONS_INITIATED_NO_UPDATES_VERSION })

export const fetchTransactionsSuccessNoUpdatesVersion = (data) => ({ type: FETCH_TRANSACTIONS_SUCCESS_NO_UPDATES_VERSION, payload: data })

export const handleTransactionsFetch = (
  page,
  limit,
  modeFilter,
  statusFilter,
  planIdFilter,
  transactionTimeFromFilter,
  transactionTimeToFilter,
  searchKeyword
) => {
  return async (dispatch) => {
    try {
      dispatch(initiateFetchTransactions())
      const response = await useJwt.getTransactions(
        page,
        limit,
        modeFilter,
        statusFilter,
        planIdFilter,
        transactionTimeFromFilter,
        transactionTimeToFilter,
        searchKeyword
      )
      if (response && response.data) {
        dispatch(fetchTransactionsSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}

export const handleTransactionsFetchNoUpdatesVersion = (
  page,
  limit,
  modeFilter,
  statusFilter,
  planIdFilter,
  transactionTimeFromFilter,
  transactionTimeToFilter,
  searchKeyword
) => {
  return async (dispatch) => {
    try {
      dispatch(initiateFetchTransactionsNoUpdatesVersion())
      const response = await useJwt.getTransactions(
        page,
        limit,
        modeFilter,
        statusFilter,
        planIdFilter,
        transactionTimeFromFilter,
        transactionTimeToFilter,
        searchKeyword
      )
      if (response && response.data) {
        dispatch(fetchTransactionsSuccessNoUpdatesVersion(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
