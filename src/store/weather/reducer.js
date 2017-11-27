import { handleActions, combineActions } from 'redux-actions'
import { combineReducers } from 'redux'
import uniq from 'lodash/uniq'
import without from 'lodash/without'

import {
  searchCityRequest,
  searchCitySuccess,
  searchCityFailure,
  addCity,
  removeCity,
  getWeatherRequest,
  getWeatherSuccess,
  getWeatherFailure,
} from './actions'

const localCities = localStorage.getItem('cities') || null

const searchResult = handleActions({
  [searchCitySuccess]: (state, action) => action.payload,
}, [])

const cities = handleActions({
  [addCity]: (state, action) => {
    const preparedCities = uniq([...state, action.payload])
    localStorage.setItem('cities', preparedCities)

    return preparedCities
  },
  [removeCity]: (state, action) => {
    const preparedCities = without(state, action.payload)
    localStorage.setItem('cities', preparedCities)

    return preparedCities
  },
}, localCities ? localCities.split(',') : [])

const weather = handleActions({
  [getWeatherRequest]: (state, action) => {
    const preparedData = state
    Array.isArray(action.payload) ? action.payload.map((item) => {
      preparedData[item] = { fetch: true }
      return true
    }) : preparedData[action.payload] = { fetch: true }
    return ({ ...preparedData })
  },
  [removeCity]: (state, action) => {
    const cities = state
    delete cities[action.payload]

    return cities
  },
  [getWeatherFailure]: (state, action) => ({ ...state, [action.payload]: { fetch: false } }),
  [getWeatherSuccess]: (state, action) => ({ ...state, [action.payload.payload]: { ...action.payload.data, fetch: false } }),
}, {})

const fetching = handleActions({
  [searchCityRequest]: state => ({ ...state, search: true }),
  [combineActions(searchCitySuccess, searchCityFailure)]: state => ({ ...state, search: false }),
}, { search: false })

const search = combineReducers({
  searchResult,
  cities,
  weather,
  fetching,
})

export default search
