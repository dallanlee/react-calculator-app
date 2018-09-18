import PropTypes from "prop-types"
import React from "react"
import ResponsiveText from "./ResponsiveText"

const Display = props => (
  <div className="component--display">
    <ResponsiveText>{props.value}</ResponsiveText>
  </div>
)

Display.propTypes = {
  value: PropTypes.string.isRequired,
}

export default Display
