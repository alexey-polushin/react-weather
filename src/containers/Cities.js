import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import difference from 'lodash/difference'
import idx from 'idx'

import { getWeatherRequest, removeCity } from 'store/actions'

import { fromWeather } from 'store/selectors'

import { CitySticker } from 'components'

class CitiesContainer extends Component {
  componentDidMount() {
    const { cities, getWeather } = this.props
    Object.keys(cities).length && getWeather(cities)
  }

  componentWillReceiveProps(nextProps) {
    const { cities, getWeather } = this.props
    const getKeys = obj => Object.keys(obj)
    const diff = difference(getKeys(nextProps.cities), getKeys(cities))

    if (diff.length) {
      getWeather(Object.assign({}, ...diff.map(id => ({ [id]: nextProps.cities[id] }))))
    }
  }

  render() {
    const {
      loadedCities,
      cities,
      removeItem,
      minTemperature,
    } = this.props
    const cityStickers = Object.keys(loadedCities).map((cityKye, key) =>
      idx(loadedCities[cityKye], _ => _.Temperature.Maximum.Value) > minTemperature &&
      <CitySticker
        cityName={cities[cityKye]}
        forecast={loadedCities[cityKye]}
        onClick={removeItem}
        {...{ key, cityKye }}
      />)

    return cityStickers
  }
}

CitiesContainer.propTypes = {
  cities: PropTypes.object,
  loadedCities: PropTypes.object,
  getWeather: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  minTemperature: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
  cities: fromWeather.getCitiesIds(state),
  loadedCities: fromWeather.getWeather(state),
  minTemperature: fromWeather.getMinTemperature(state),
})

const mapDispatchToProps = dispatch => ({
  getWeather: data => dispatch(getWeatherRequest(data)),
  removeItem: data => dispatch(removeCity(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CitiesContainer)
