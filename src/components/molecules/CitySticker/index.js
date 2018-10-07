import React from 'react'
import PropTypes from 'prop-types'
import idx from 'idx'

import {
  Block,
  Loader,
  Button,
  Image,
} from 'components'

const CitySticker = ({
  cityName,
  forecast,
  onClick,
  cityKye,
}) => {
  const temperature = idx(forecast, _ => _.Temperature.Maximum.Value)
  const iconNumber = idx(forecast, _ => _.Day.Icon)

  const content = forecast.fetch ?
    <Loader /> :
    (
      <Block className="sticker-info">
        <Button className="close" onClick={() => onClick(cityKye)}>X</Button>
        <Block className="city-name">{cityName}</Block>
        <Block className="temperature">
          <Image
            url={`http://developer.accuweather.com/sites/default/files/${iconNumber < 10 ? '0' : ''}${iconNumber}-s.png`}
            alt={idx(forecast, _ => _.Day.IconPhrase)}
          />
          {`${temperature > 0 ? '+' : ''}${temperature}°С`}
        </Block>
        <Block className="additional-info">
          <Block className="wind-speed">{`Ветер ${idx(forecast, _ => _.Day.Wind.Speed.Value)} км/ч`}</Block>
          { idx(forecast, _ => _.weather.pressure) &&
            <Block className="pressure">{`Давление ${forecast.weather.pressure} мм`}</Block>
          }
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
  cityName: PropTypes.string,
  forecast: PropTypes.object,
  cityKye: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export default CitySticker
