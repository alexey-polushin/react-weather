import React from 'react'
import { connect } from 'react-redux'

import { searchCityRequest } from 'store/actions'
import { fromWeather } from 'store/selectors'

import { SearchForm } from 'components'

const SearchFormContainer = props => <SearchForm {...props} />

const mapStateToProps = state => ({
  foundValues: fromWeather.getSearchResponse(state),
})

const mapDispatchToProps = dispatch => ({
  onChange: data => console.log('onChange', data),
  onInputChange: data => data && dispatch(searchCityRequest(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormContainer)
