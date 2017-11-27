import axios from 'axios'
import { apis } from 'config'

const facade = {}

const api = axios.create({
  baseURL: apis.apiUrl,
})

facade.request = config => api.request(config)

facade.searchCity = queryString => facade.request({
  url: `/city/search.${apis.format}`,
  method: 'get',
  params: {
    q: queryString,
    limit: apis.searchLimit,
  },
})

facade.getWeather = cityName => facade.request({
  url: `/current.${apis.format}`,
  method: 'get',
  params: {
    city: cityName,
  },
})

export default facade
