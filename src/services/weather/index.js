import axios from 'axios'
import { apis } from 'config'

const facade = {}

const api = axios.create({
  baseURL: apis.accuweatherApi,
  params: {
    apikey: apis.apiKey,
    language: 'ru-ru',
  },
})

facade.request = config => api.request(config)

facade.searchCity = queryString => facade.request({
  url: `/locations/${apis.version}/cities/autocomplete`,
  method: 'get',
  params: {
    q: queryString.trim(),
  },
})

facade.getWeather = cityKey => facade.request({
  url: `/forecasts/${apis.version}/daily/1day/${cityKey}`,
  method: 'get',
  params: {
    metric: true,
    details: true,
  },
})

export default facade
