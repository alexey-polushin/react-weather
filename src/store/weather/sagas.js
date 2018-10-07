import { take, put, call, fork, all } from 'redux-saga/effects'
import idx from 'idx'

import api from 'services/weather'
import * as actions from './actions'

export function* searchCity({ payload }) {
  try {
    const { data } = yield call(
      api.searchCity,
      payload,
    )

    yield put(actions.searchCitySuccess(data || []))
  } catch (e) {
    yield put(actions.searchCityFailure(e))
  }
}

export function* getWeather({ payload }) {
  try {
    yield put(actions.getWeatherRequest(payload))
    const { data } = yield call(
      api.getWeather,
      payload,
    )

    yield put(actions.getWeatherSuccess({ cityKey: payload, data: idx(data, _ => _.DailyForecasts[0]) }))
  } catch (e) {
    yield put(actions.getWeatherFailure(payload))
  }
}

export function* watchSearchCityRequest() {
  while (true) {
    const action = yield take(actions.searchCityRequest)
    yield call(searchCity, { ...action })
  }
}

export function* watchtWeatherRequest() {
  while (true) {
    const action = yield take(actions.getWeatherRequest)
    yield all(Object.keys(action.payload).map(item => call(getWeather, { type: action.type, payload: item })))
  }
}

export function* watchtAddCityRequest() {
  while (true) {
    const action = yield take(actions.getWeatherRequest)
    return action
  }
}

export default function* () {
  yield [
    fork(watchSearchCityRequest),
    fork(watchtWeatherRequest),
    fork(watchtAddCityRequest),
  ]
}
