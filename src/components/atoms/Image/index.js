import PropTypes from 'prop-types'
import React from 'react'

const Image = ({ ...props }) => {
  return (
    <img
      src={props.url.toString()}
      alt={props.alt}
    />
  )
}

Image.propTypes = {
  alt: PropTypes.string,
  url: PropTypes.string,
}

export default Image
