import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

class SearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedValue: null,
    }

    this.setCity = this.setCity.bind(this)
  }

  setCity(item) {
    this.setState({
      selectedValue: item,
    })
  }

  render() {
    const { selectedValue } = this.state
    const { onInputChange, onChange, foundValues } = this.props

    return (
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
    )
  }
}

SearchForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  foundValues: PropTypes.array,
}

export default SearchForm
