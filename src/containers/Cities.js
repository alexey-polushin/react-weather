import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getWeatherRequest } from 'store/actions'

import { fromWeather } from 'store/selectors'

import { CitySticker } from 'components'

class CitiesContainer extends Component {
  componentDidMount() {
    const { cities, getWeather } = this.props
    getWeather(cities)
  }

  render() {
    const { loadedCities } = this.props
    const cityStickers = Object.keys(loadedCities).map((city, key) =>
      <CitySticker cityInfo={loadedCities[city]} {...{ key }} />)

    return cityStickers
  }
}

CitiesContainer.propTypes = {
  cities: PropTypes.array,
  loadedCities: PropTypes.object,
  getWeather: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  cities: fromWeather.getCitiesIds(state),
  loadedCities: fromWeather.getWeather(state),
})

const mapDispatchToProps = dispatch => ({
  getWeather: data => dispatch(getWeatherRequest(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CitiesContainer)
