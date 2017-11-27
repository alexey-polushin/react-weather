import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import idx from 'idx'

import {
  Block,
  Button,
} from 'components'

class SearchForm extends Component {
  constructor() {
    super()
    this.state = {
      selectedValue: null,
    }

    this.setCity = this.setCity.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.props.addCity(idx(this.state, _ => _.selectedValue.name_en))
    this.setState({
      selectedValue: null,
    })
  }

  setCity(item) {
    this.setState({
      selectedValue: item,
    })
  }

  render() {
    const { selectedValue } = this.state
    const { onInputChange, foundValues } = this.props
    const { onClick } = this

    return (
      <Block>
        <Select
          {...{ onInputChange }}
          onChange={this.setCity}
          value={selectedValue}
          valueKey="id"
          labelKey="name_ru"
          options={foundValues}
          searchable
          noResultsText="Ничего не найдено"
          name="city-search"
          className="search-form"
          placeholder="Поиск города"
        />
        <Button disabled={!Boolean(selectedValue)} {...{ onClick }}>+</Button>
      </Block>
    )
  }
}

SearchForm.propTypes = {
  addCity: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  foundValues: PropTypes.array,
}

export default SearchForm
