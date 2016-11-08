import React from 'react'
import {  WingBlank, Flex } from 'antd-mobile'
import CategoryGridItem from './categoryGridItem.jsx'

const CategoryGrid = React.createClass({
  render() {
    return (
      <div className="flex-container">
        <WingBlank size="lg">
          <Flex>
            <Flex.Item>
              <CategoryGridItem />
            </Flex.Item>
            <Flex.Item>
              <CategoryGridItem />
            </Flex.Item>
            <Flex.Item>
              <CategoryGridItem />
            </Flex.Item>
            <Flex.Item>
              <CategoryGridItem />
            </Flex.Item>
            <Flex.Item>
              <CategoryGridItem />
            </Flex.Item>
            <Flex.Item>
              <CategoryGridItem />
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  },
})

export default CategoryGrid
