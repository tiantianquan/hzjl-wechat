import React from 'react'
import ReactDOM from 'react-dom'

import 'antd-mobile/dist/antd-mobile.css'
import './style.css'

import { SearchBar } from 'antd-mobile'
import {Pagination,Icon, Flex, NavBar, WingBlank, WhiteSpace } from 'antd-mobile'

import MainList from './components/mainList.jsx'

const SearchBarExample = React.createClass({
  getInitialState() {
    return {
      value: '',
    }
  },
  onChange(value) {
    this.setState({ value })
  },
  render() {
    return (
      <SearchBar
        value={this.state.value}
        placeholder="搜索"
        onCancel={(searchValue) => { alert(`${searchValue}, 取消事件自定`) } }
        cancelText="搜索"
        showCancelButton
        onChange={this.onChange}
        />
    )
  },
})

const FlexExample = React.createClass({
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
    );

  },
})




const App = React.createClass({
  render() {
    return (
      <div>
        <NavBar 
        // leftContent="返回" 
        mode="dark" 
        // onLeftClick={() => console.log('onLeftClick')}
          >环渤海</NavBar>
        <FlexExample />
        <SearchBarExample />
        <MainList />
         <Pagination
              total={5}
              current={1}
              prevText={'上一页'}
              nextText={<div>下一页<Icon type="right" /></div>}
            />
      </div>

    )
  }
})


const mountNode = document.querySelector("#app")
ReactDOM.render(<App />, mountNode);

