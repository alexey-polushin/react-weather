import { createAction } from 'redux-actions'

export const searchCityRequest = createAction('SEARCH_CITY_REQUEST')
export const searchCitySuccess = createAction('SEARCH_CITY_SUCCESS')
export const searchCityFailure = createAction('SEARCH_CITY_FAILURE')
