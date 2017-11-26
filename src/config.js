const merge = require('lodash/merge')

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV !== 'production',
    basename: process.env.PUBLIC_PATH,
    isBrowser: typeof window !== 'undefined',
    apis: {
      apiUrl: 'http://opogode.ru/api/v1',
      format: 'json',
      searchLimit: 20,
    },
  },
  test: {},
  development: {},
  production: {
  },
}

module.exports = merge(config.all, config[config.all.env])
