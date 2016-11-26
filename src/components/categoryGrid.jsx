import React from 'react'
import { WingBlank, Flex } from 'antd-mobile'
import CategoryGridItem from './categoryGridItem.jsx'

const CategoryGrid = React.createClass({
  render() {
    return (
      <div className="flex-container">
        <WingBlank size="lg">
          {this.props.children}
        </WingBlank>
      </div>
    )
  }
})

CategoryGrid.Row = React.createClass({
  render() {
    return (
      <Flex>
        {this.props.children}
      </Flex>
    )
  }
})

CategoryGrid.Item = CategoryGridItem

export default CategoryGrid
