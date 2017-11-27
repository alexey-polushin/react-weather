import React from 'react'
import PropTypes from 'prop-types'
import idx from 'idx'

import {
  Block,
  Loader,
} from 'components'

const CitySticker = ({ cityInfo }) => {
  const content = cityInfo.fetch ?
    <Loader /> :
    (
      <Block>
        <Block>{idx(cityInfo, _ => _.city.name_ru)}</Block>
        <Block>{idx(cityInfo, _ => _.weather.temperature)}</Block>
        <Block>{idx(cityInfo, _ => _.weather.wind.speed)}</Block>
        <Block>{idx(cityInfo, _ => _.weather.condition.name_ru)}</Block>
      </Block>
    )

  return (
    content
  )
}

CitySticker.propTypes = {
  cityInfo: PropTypes.object,
}

export default CitySticker
