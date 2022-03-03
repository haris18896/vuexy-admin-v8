import { PAGE_CHANGE_LIST_CITIES } from '../../actionType/city/fetch'
import { handleCitiesFetch } from '../fetch'

export const handlePageChangeListCities = (page, limit, continentFilter, countryIdFilter, searchKeyword) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch({ type: PAGE_CHANGE_LIST_CITIES, payload: newPage })
    dispatch(handleCitiesFetch(newPage, limit, continentFilter, countryIdFilter, searchKeyword))
  }
}
