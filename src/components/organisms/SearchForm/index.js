import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { Row, Col } from 'react-flexbox-grid'
import idx from 'idx'
import Slider from 'rc-slider'

import {
  Button,
  Block,
} from 'components'

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCity: null,
      minTemperature: props.minTemperature,
    }

    this.setCity = this.setCity.bind(this)
    this.onClick = this.onClick.bind(this)
    this.displayTemperatureFilter = this.displayTemperatureFilter.bind(this)
  }

  onClick() {
    this.props.addCity(idx(this.state, _ => _.selectedCity))
    this.setState({
      selectedCity: null,
    })
  }

  setCity(item) {
    this.setState({
      selectedCity: item,
    })
  }

  displayTemperatureFilter(value) {
    this.setState({
      minTemperature: value > 0 ? `+${value}` : value,
    })
  }

  render() {
    const { selectedCity, minTemperature } = this.state
    const { onInputChange, foundValues, setMinTemperature } = this.props
    const { onClick, displayTemperatureFilter } = this

    return (
      <Row className="search-bar">
        <Col xs={6}>
          <Select
            {...{ onInputChange }}
            onChange={this.setCity}
            value={selectedCity}
            valueKey="Key"
            labelKey="LocalizedName"
            options={foundValues}
            searchable
            noResultsText="Ничего не найдено"
            name="city-search"
            className="search-form"
            placeholder="Поиск города"
          />
        </Col>
        <Col xs={2}>
          <Button className="add-city" disabled={!Boolean(selectedCity)} {...{ onClick }}>+</Button>
        </Col>
        <Col sm={4} xs={12}>
          <Block className="slider-title">Где сейчас теплее, чем</Block>
          <Slider
            min={-30}
            max={30}
            defaultValue={0}
            onChange={displayTemperatureFilter}
            onAfterChange={setMinTemperature}
          />
          <Block className="slider-value">{minTemperature}°С</Block>
        </Col>
      </Row>
    )
  }
}

SearchForm.propTypes = {
  addCity: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  setMinTemperature: PropTypes.func.isRequired,
  minTemperature: PropTypes.number,
  foundValues: PropTypes.array,
}

export default SearchForm
