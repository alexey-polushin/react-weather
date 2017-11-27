import { createAction } from 'redux-actions'

export const searchCityRequest = createAction('SEARCH_CITY_REQUEST')
export const searchCitySuccess = createAction('SEARCH_CITY_SUCCESS')
export const searchCityFailure = createAction('SEARCH_CITY_FAILURE')

export const addCity = createAction('ADD_CITY')
export const removeCity = createAction('REMOVE_CITY')

export const getWeatherRequest = createAction('GET_WEATHER_REQUEST')
export const getWeatherSuccess = createAction('GET_WEATHER_SUCCESS')
export const getWeatherFailure = createAction('GET_WEATHER_FAILURE')
