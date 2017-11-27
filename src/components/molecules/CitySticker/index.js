import React from 'react'
import PropTypes from 'prop-types'
import idx from 'idx'

import {
  Block,
  Loader,
  Button,
} from 'components'

const CitySticker = ({ cityInfo }) => {
  const temperature = idx(cityInfo, _ => _.weather.temperature);

  const content = cityInfo.fetch ?
    <Loader /> :
    (
      <Block className="sticker-info">
        <Button className="close">X</Button>
        <Block className="city-name">{idx(cityInfo, _ => _.city.name_ru)}</Block>
        <Block className="temperature">{`${temperature > 0 ? '+' : ''}${temperature}°С`}</Block>
        <Block className="additional-info">
          <Block className="wind-speed">{`Ветер ${idx(cityInfo, _ => _.weather.wind.speed)} м/с`}</Block>
          <Block className="pressure">{`Давление ${idx(cityInfo, _ => _.weather.pressure)} мм`}</Block>
        </Block>
      </Block>
    )

  return (
    <Block className="sticker-block">
      {content}
    </Block>
  )
}

CitySticker.propTypes = {
  cityInfo: PropTypes.object,
}

export default CitySticker
