import Big from "big.js"

export const formatNumber = num => {
  let parts = num.toString().split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return parts.join(".")
}

const doOperation = (firstNum, secondNum, operator) => {
  const first = Big(firstNum)
  const second = Big(secondNum)

  if (operator === "+") {
    return first.plus(second).toString()
  }

  if (operator === "-") {
    return first.minus(second).toString()
  }

  if (operator === "×") {
    return first.times(second).toString()
  }

  if (operator === "÷") {
    return first.div(second).toString()
  }

  throw Error(`Unknown operator ${operator}`)
}

const isNumber = value => {
  return /[0-9]+/.test(value)
}

export const calculate = (states, keyValue) => {
  if (keyValue === "AC") {
    return {
      total: null,
      next: null,
      operator: null,
      clearAll: true,
    }
  }

  if (keyValue === "C") {
    return {
      next: "0",
      operator: null,
      clearAll: true,
    }
  }

  if (isNumber(keyValue)) {
    if (states.next === "0." || (states.next === null && states.total === "0.")) {
      return {
        next: "0." + keyValue,
        clearAll: false,
      }
    }

    if ((keyValue === "0" && states.total === "0") || (keyValue === "0" && states.next === null)) {
      return {
        clearAll: true,
      }
    }

    if (states.operator) {
      if (states.next) {
        return {
          next: states.next + keyValue,
          clearAll: false,
        }
      } else {
        return {
          next: keyValue,
          clearAll: false,
        }
      }
    }

    if (states.next === "0") {
      return {
        next: keyValue,
        clearAll: false,
      }
    } else {
      return {
        next: (states.next && states.next + keyValue) || keyValue,
        total: null,
        clearAll: false,
      }
    }
  }

  if (keyValue === ".") {
    if (states.next) {
      if (states.next.includes(".")) {
        return {}
      }
      return {
        next: states.next + ".",
        clearAll: false,
      }
    }

    if (states.operator) {
      return {
        next: "0.",
        clearAll: false,
      }
    }

    if (states.total) {
      if (states.total.includes(".")) {
        return {
          clearAll: false,
        }
      }
      return {
        total: states.total + ".",
        clearAll: false,
      }
    }

    return {
      total: "0.",
      clearAll: false,
    }
  }

  if (keyValue === "=") {
    if (states.next && states.operator) {
      return {
        prev: states.next,
        total: doOperation(states.total, states.next, states.operator),
        next: null,
        clearAll: false,
      }
    }
    if (states.prev && states.operator) {
      return {
        total: doOperation(states.total, states.prev, states.operator),
        next: null,
        clearAll: false,
      }
    } else {
      return {
        clearAll: false,
      }
    }
  }

  if (keyValue === "%") {
    if (states.next) {
      return {
        next: (0.01 * parseFloat(states.next)).toString(),
      }
    }

    if (states.total) {
      return {
        total: (0.01 * parseFloat(states.total)).toString(),
      }
    }

    return {}
  }

  if (keyValue === "+/-") {
    if (states.next) {
      return {
        next: (-1 * parseFloat(states.next)).toString(),
      }
    }

    if (states.total) {
      return {
        total: (-1 * parseFloat(states.total)).toString(),
      }
    }

    return {}
  }

  if (keyValue === "÷" || keyValue === "×" || keyValue === "-" || keyValue === "+") {
    if (states.operator) {
      if (keyValue === states.operator) {
        return {
          prev: states.next || states.prev,
          total: doOperation(states.total, states.next || states.prev, states.operator),
          next: null,
        }
      } else {
        return { operator: keyValue }
      }
    }
    if (!states.next) {
      return { operator: null }
    }
  }

  if (states.operator) {
    return {
      total: doOperation(states.total, states.next, states.operator),
      operator: keyValue,
    }
  }

  if (!states.next) {
    return {
      operator: keyValue,
    }
  }

  return {
    total: states.next,
    next: null,
    operator: keyValue,
  }
}
