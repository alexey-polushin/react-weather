import idx from 'idx'

export const getSearchResponse = state => state.searchResult
export const getCitiesIds = state => state.cities
export const getWeather = state => idx(state, _ => _.weather)
