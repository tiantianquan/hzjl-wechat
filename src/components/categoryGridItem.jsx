import React from 'react'
import { WhiteSpace, Flex } from 'antd-mobile'
import { Link } from 'react-router'

const CategoryGridItem = React.createClass({
  render() {
    return (
      <Flex.Item>
        <Link style={{ display: 'block', textAlign: 'center' }}
          to={this.props.path} activeStyle={{color:'#108ee9'}}>
          <WhiteSpace size="lg" />
          <span>{this.props.name}</span>
          <WhiteSpace size="lg" />
        </Link>
      </Flex.Item >)
  }
})

export default CategoryGridItem
