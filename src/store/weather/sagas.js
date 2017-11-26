import { take, put, call, fork } from 'redux-saga/effects'
import api from 'services/weather'
import * as actions from './actions'

export function* searchCity({ payload }) {
  try {
    const { data } = yield call(
      api.searchCity,
      payload,
    )
    yield put(actions.searchCitySuccess(data))
  } catch (e) {
    yield put(actions.searchCityFailure(e))
  }
}

export function* watchSearchCityRequest() {
  while (true) {
    const action = yield take(actions.searchCityRequest)
    yield call(searchCity, { ...action })
  }
}

export default function* () {
  yield fork(watchSearchCityRequest)
}
