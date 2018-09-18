import PropTypes from "prop-types"
import React from "react"
import Key from "./Key"

const Keypad = props => {
  const handleKeyClick = keyValue => props.onKeyClick(keyValue)

  const keys = [
    { value: props.clearAll ? "AC" : "C", id: "AC", classes: "key--function" },
    {
      value: (
        <React.Fragment>
          <sup>+</sup>/<sub>-</sub>
        </React.Fragment>
      ),
      id: "+/-",
      classes: "key--function",
    },
    { value: "%", id: "%", classes: "key--function" },
    { value: "÷", id: "÷", classes: props.operator === "÷" ? "key--operator operator-active" : "key--operator" },
    { value: "7", id: "7", classes: "key--digit" },
    { value: "8", id: "8", classes: "key--digit" },
    { value: "9", id: "9", classes: "key--digit" },
    { value: "×", id: "×", classes: props.operator === "×" ? "key--operator operator-active" : "key--operator" },
    { value: "4", id: "4", classes: "key--digit" },
    { value: "5", id: "5", classes: "key--digit" },
    { value: "6", id: "6", classes: "key--digit" },
    { value: "-", id: "-", classes: props.operator === "-" ? "key--operator operator-active" : "key--operator" },
    { value: "1", id: "1", classes: "key--digit" },
    { value: "2", id: "2", classes: "key--digit" },
    { value: "3", id: "3", classes: "key--digit" },
    { value: "+", id: "+", classes: props.operator === "+" ? "key--operator operator-active" : "key--operator" },
    { value: "0", id: "0", classes: "key--digit key--wide" },
    { value: ".", id: ".", classes: "key--digit key--decimal" },
    { value: "=", id: "=", classes: "key--operator" },
  ]

  return (
    <div className="component--keypad">
      {keys.map(key => (
        <Key key={key.id} id={key.id} value={key.value} classes={key.classes} onKeyClick={handleKeyClick} />
      ))}
    </div>
  )
}

Keypad.propTypes = {
  onKeyClick: PropTypes.func.isRequired,
}

export default Keypad
