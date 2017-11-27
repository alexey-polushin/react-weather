import React from 'react'
import { connect } from 'react-redux'

import { searchCityRequest, addCity, setMinTemperature } from 'store/actions'
import { fromWeather } from 'store/selectors'

import { SearchForm } from 'components'

const SearchFormContainer = props => <SearchForm {...props} />

const mapStateToProps = state => ({
  foundValues: fromWeather.getSearchResponse(state),
  minTemperature: fromWeather.getMinTemperature(state),
})

const mapDispatchToProps = dispatch => ({
  addCity: data => dispatch(addCity(data)),
  onInputChange: data => data && dispatch(searchCityRequest(data)),
  setMinTemperature: data => data && dispatch(setMinTemperature(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormContainer)
