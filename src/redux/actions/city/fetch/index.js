import useJwt from "@src/auth/jwt/useJwt"
import {
  FETCH_CITIES_INITIATED,
  FETCH_CITIES_INITIATED_NO_UPDATES_VERSION,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_SUCCESS_NO_UPDATES_VERSION,
  FETCH_CITY_INITIATED,
  FETCH_CITY_SUCCESS,
} from "../../actionType/city/fetch"

export const initiateFetchCities = () => ({ type: FETCH_CITIES_INITIATED })

export const initiateFetchCity = () => ({ type: FETCH_CITY_INITIATED })

export const fetchCitySuccess = (data) => ({ type: FETCH_CITY_SUCCESS, payload: data })

export const initiateFetchCitiesNoUpdatesVersion = () => ({ type: FETCH_CITIES_INITIATED_NO_UPDATES_VERSION })

export const fetchCitiesSuccess = (data) => ({ type: FETCH_CITIES_SUCCESS, payload: data })

export const fetchCitiesSuccessNoUpdatesVersion = (data) => ({ type: FETCH_CITIES_SUCCESS_NO_UPDATES_VERSION, payload: data })

export const handleCitiesFetch = (
  page,
  limit,
  continentFilter, 
  countryIdFilter, 
  searchKeyword
) => {
  return async (dispatch) => {
    try {
      dispatch(initiateFetchCities())
      const response = await useJwt.getCities(
        page,
        limit,
        continentFilter, 
        countryIdFilter, 
        searchKeyword
      )
      if (response && response.data) {
        dispatch(fetchCitiesSuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}

export const handleCitiesFetchNoUpdatesVersion = (
  page,
  limit,
  continentFilter, 
  countryIdFilter, 
  searchKeyword
) => {
  return async (dispatch) => {
    try {
      dispatch(initiateFetchCitiesNoUpdatesVersion())
      const response = await useJwt.getCities(
        page,
        limit,
        continentFilter, 
        countryIdFilter, 
        searchKeyword
      )
      if (response && response.data) {
        dispatch(fetchCitiesSuccessNoUpdatesVersion(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}

export const handleCityFetch = (id) => {
  return async (dispatch) => {
    try {
      dispatch(initiateFetchCity())
      const response = await useJwt.getCity(id)
      if (response && response.data) {
        dispatch(fetchCitySuccess(response.data))
      }
    } catch (err) {
      if (err.response && err.response.data) {
        console.log(err.response.data)
      }
    }
  }
}
