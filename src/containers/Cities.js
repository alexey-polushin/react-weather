import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import difference from 'lodash/difference'

import { getWeatherRequest, removeCity } from 'store/actions'

import { fromWeather } from 'store/selectors'

import { CitySticker } from 'components'

class CitiesContainer extends Component {
  constructor() {
    super()

    this.onClick = this.onClick.bind(this)
  }

  componentDidMount() {
    const { cities, getWeather } = this.props
    getWeather(cities)
  }

  componentWillReceiveProps(nextProps) {
    const { cities, getWeather } = this.props
    const diff = difference(nextProps.cities, cities)
    if (diff.length) {
      getWeather(diff)
    }
  }

  onClick(cityKye) {
    this.props.removeItem(cityKye)
  }

  render() {
    const { loadedCities } = this.props
    const { onClick } = this
    const cityStickers = Object.keys(loadedCities).map((cityKye, key) =>
      <CitySticker cityInfo={loadedCities[cityKye]} {...{ key, onClick, cityKye }} />)

    return cityStickers
  }
}

CitiesContainer.propTypes = {
  cities: PropTypes.array,
  loadedCities: PropTypes.object,
  getWeather: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  cities: fromWeather.getCitiesIds(state),
  loadedCities: fromWeather.getWeather(state),
})

const mapDispatchToProps = dispatch => ({
  getWeather: data => dispatch(getWeatherRequest(data)),
  removeItem: data => dispatch(removeCity(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CitiesContainer)
