import { PAGE_CHANGE_LIST_CITIES, SELECT_CHANGE_CITIES_LIST } from '../../actionType/city/fetch'
import { handleCitiesFetch } from '../fetch'

export const handleSelectChangeListCities = (newLimit, oldLimit, continentFilter, countryIdFilter, searchKeyword) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch({ type: SELECT_CHANGE_CITIES_LIST, payload: newLimit })
      dispatch({ type: PAGE_CHANGE_LIST_CITIES, payload: 1 })
      dispatch(handleCitiesFetch(1, newLimit, continentFilter, countryIdFilter, searchKeyword))
    }
  }
}
