const merge = require('lodash/merge')

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV !== 'production',
    basename: process.env.PUBLIC_PATH,
    isBrowser: typeof window !== 'undefined',
    apis: {
      accuweatherApi: 'https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com',
      version: 'v1',
      apiKey: 'd3rVmuirgvrN8GJXtPwQjMpA0Gpxa9jy',
    },
  },
  test: {},
  development: {},
  production: {
  },
}

module.exports = merge(config.all, config[config.all.env])
