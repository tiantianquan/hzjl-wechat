import React from 'react'
import { NavBar } from 'antd-mobile'

const Nav = React.createClass({
  render() {
    return (
      <NavBar
        // leftContent="返回" 
        mode="dark"
        onLeftClick={() => this.props.goBack()}
        >环渤海</NavBar>
    )
  }
})

export default Nav

