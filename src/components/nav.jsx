import React from 'react'
import { NavBar } from 'antd-mobile'

const Nav = React.createClass({
  render() {
    return (
      <NavBar 
        // leftContent="返回" 
        mode="dark"
        onLeftClick={() => this.props.goBack()}
        ><span className="nav-title">{this.props.title}</span></NavBar>
    )
  }
})

export default Nav

