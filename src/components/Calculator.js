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
