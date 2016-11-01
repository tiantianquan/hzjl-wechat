import React from 'react'
import { NavBar } from 'antd-mobile'

const Nav = React.createClass({
  render() {
    return (
      <NavBar
        // leftContent="返回" 
        mode="dark"
        // onLeftClick={() => console.log('onLeftClick')}
        >环渤海</NavBar>
    )
  }
})

export default Nav

