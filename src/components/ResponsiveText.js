import React, { Component } from "react"

class ResponsiveText extends Component {
  state = {
    scaleFactor: 1,
  }

  componentDidUpdate() {
    const { scaleFactor } = this.state

    const textNode = this.node
    const containerNode = textNode.parentNode

    const textWidth = textNode.offsetWidth
    // @ts-ignore
    const containerWidth = containerNode.offsetWidth

    if (scaleFactor === containerWidth / textWidth) {
      return
    }

    if (textWidth > containerWidth) {
      this.setState({ scaleFactor: containerWidth / textWidth })
    }

    if (textWidth < containerWidth && scaleFactor < 1) {
      this.setState({ scaleFactor: 1 })
    }
  }

  render() {
    const { scaleFactor } = this.state
    return (
      <div
        className="component--responsive-text"
        {...this.props}
        style={
          scaleFactor !== 1
            ? {
                transform: `scale(${scaleFactor})`,
                transformOrigin: `right 100%`,
              }
            : {}
        }
        ref={node => (this.node = node)}
      >
        {this.props.children}
      </div>
    )
  }
}

export default ResponsiveText
