import { handleActions, combineActions } from 'redux-actions'
import { combineReducers } from 'redux'

import {
  searchCityRequest,
  searchCitySuccess,
  searchCityFailure,
  addCity,
  removeCity,
  getWeatherRequest,
  getWeatherSuccess,
  getWeatherFailure,
  setMinTemperature,
} from './actions'

const localCities = localStorage.getItem('cities') || null

const searchResult = handleActions({
  [searchCitySuccess]: (state, action) => action.payload,
}, [])

const cities = handleActions({
  [addCity]: (state, action) => {
    const preparedCitiesArray = {
      ...state,
      [action.payload.Key]: action.payload.LocalizedName,
    }

    localStorage.setItem('cities', JSON.stringify(preparedCitiesArray))

    return { ...state, [action.payload.Key]: action.payload.LocalizedName }
  },
  [removeCity]: (state, action) => {
    const cities = { ...state }
    delete cities[action.payload]

    localStorage.setItem('cities', JSON.stringify(cities))

    return cities
  },
}, localCities
  ? JSON.parse(localCities)
  : {})

const weather = handleActions({
  [getWeatherRequest]: (state, action) => {
    const preparedData = state

    typeof action.payload === 'object' ? Object.keys(action.payload).map((item) => {
      preparedData[item] = { fetch: true }
      return true
    }) : preparedData[action.payload] = { fetch: true }
    return ({ ...preparedData })
  },
  [removeCity]: (state, action) => {
    const cities = { ...state }
    delete cities[action.payload]

    return cities
  },
  [getWeatherFailure]: (state, action) => ({ ...state, [action.payload]: { fetch: false } }),
  [getWeatherSuccess]: (state, action) => ({ ...state, [action.payload.cityKey]: { ...action.payload.data, fetch: false } }),
}, {})

const fetching = handleActions({
  [searchCityRequest]: state => ({ ...state, search: true }),
  [combineActions(searchCitySuccess, searchCityFailure)]: state => ({ ...state, search: false }),
}, { search: false })

const minTemperature = handleActions({
  [setMinTemperature]: (state, action) => action.payload,
}, 0)

const search = combineReducers({
  searchResult,
  cities,
  weather,
  minTemperature,
  fetching,
})

export default search
