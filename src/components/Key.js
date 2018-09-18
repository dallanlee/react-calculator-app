import PropTypes from "prop-types"
import React from "react"

const Key = props => {
  const handleKeyClick = () => props.onKeyClick(props.id)

  return (
    <div className={`component--key ${props.classes}`}>
      <button onClick={handleKeyClick}>{props.value}</button>
    </div>
  )
}

Key.propTypes = {
  value: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  classes: PropTypes.string.isRequired,
  onKeyClick: PropTypes.func.isRequired,
}

export default Key
