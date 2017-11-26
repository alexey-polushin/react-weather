import { handleActions, combineActions } from 'redux-actions'
import { combineReducers } from 'redux'

import {
  searchCityRequest,
  searchCitySuccess,
  searchCityFailure,
} from './actions'

const searchResult = handleActions({
  [searchCitySuccess]: (state, action) => action.payload,
}, [])

const fetching = handleActions({
  [searchCityRequest]: state => ({ ...state, search: true }),
  [combineActions(searchCitySuccess, searchCityFailure)]: state => ({ ...state, search: false }),
}, { search: false })

const search = combineReducers({
  searchResult,
  fetching,
})

export default search
