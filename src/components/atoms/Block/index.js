import PropTypes from 'prop-types'
import React from 'react'

const Block = ({
  children, className, tag, ...props
}) => {
  const BlockElement = tag || 'div'
  return (
    <BlockElement
      className={className}
      {...props}
    >
      {children}
    </BlockElement>
  )
}

Block.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  tag: PropTypes.string,
}

export default Block
