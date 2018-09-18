import React, { Component } from "react"
import { calculate, formatNumber } from "../utils/logic"
import Display from "./Display"
import Keypad from "./Keypad"

class Calculator extends Component {
  state = {
    total: null,
    next: null,
    prev: null,
    operator: null,
    clearAll: true,
    maxDigitsEntered: false,
  }

  componentDidUpdate(prevProps, prevState) {
    const { maxDigitsEntered } = this.state
    const nextDigitLength = this.state.next && this.state.next.replace(/\./g, "").length

    if (maxDigitsEntered === false && nextDigitLength >= 9) {
      this.setState({ maxDigitsEntered: true })
    } else if (maxDigitsEntered === true && nextDigitLength < 9) {
      this.setState({ maxDigitsEntered: false })
    }
  }

  handleKeyClick = keyValue => {
    this.setState(calculate(this.state, keyValue))
  }

  render() {
    const formatedNextValue = this.state.next !== null ? formatNumber(this.state.next) : null
    const formatedTotalValue = this.state.total !== null ? formatNumber(this.state.total) : null

    return (
      <div className="component--calculator">
        <Display value={formatedNextValue || formatedTotalValue || "0"} />
        <Keypad operator={this.state.operator} clearAll={this.state.clearAll} onKeyClick={this.handleKeyClick} />
      </div>
    )
  }
}

export default Calculator
