import React from 'react'
import { WhiteSpace, WingBlank, Flex } from 'antd-mobile'

const CategoryGrid = React.createClass({
  render() {
    return (
      <div className="flex-container">
        <WhiteSpace size="lg" />
        <WingBlank size="lg">
          <Flex>
            <Flex.Item>
              <a href="#">分类</a>
            </Flex.Item>
            <Flex.Item>
              <a>分类</a>
            </Flex.Item>
            <Flex.Item>
              <a>分类</a>
            </Flex.Item>
            <Flex.Item>
              <a>分类</a>
            </Flex.Item>
            <Flex.Item>
              <a>分类</a>
            </Flex.Item>
            <Flex.Item>
              <a>分类</a>
            </Flex.Item>
          </Flex>
        </WingBlank>
        <WhiteSpace size="lg" />
      </div>
    )
  },
})

export default CategoryGrid
