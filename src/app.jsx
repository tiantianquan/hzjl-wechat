import React from 'react'
import ReactDOM from 'react-dom'

// import 'antd-mobile/dist/antd-mobile.css'
import './style.css'

import { SearchBar } from 'antd-mobile'
import { Flex, NavBar, Icon, WingBlank, WhiteSpace } from 'antd-mobile'

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
              <a href="#">今日</a>
            </Flex.Item>
            <Flex.Item>
              <a>今日</a>
            </Flex.Item>
            <Flex.Item>
              <a>今日</a>
            </Flex.Item>
            <Flex.Item>
              <a>今日</a>
            </Flex.Item>
            <Flex.Item>
              <a>今日</a>
            </Flex.Item>
            <Flex.Item>
              <a>今日</a>
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
          // rightContent={[<Icon key="0" type="user" />, <Icon key="1" type="search" />, <Icon key="2" type="plus" />]}
          // style={{
          //   zIndex:999,
          //   position:'fixed',
          //   width:'100%'
          // }}
          >Title</NavBar>
        <FlexExample />
        <SearchBarExample />
        <MainList />
      </div>

    )
  }
})


const mountNode = document.querySelector("#app")
ReactDOM.render(<App />, mountNode);

