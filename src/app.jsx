import React from 'react'
import ReactDOM from 'react-dom'

// import 'antd-mobile/dist/antd-mobile.css'
import './style.css'


import MainList from './components/mainList.jsx'
import MySearchBar from './components/searchBar.jsx'
import CategoryGrid from './components/categoryGrid.jsx'
import PageNum from './components/pageNum.jsx'
import Nav from './components/nav.jsx'

const App = React.createClass({
  render() {
    return (
      <div>
        <Nav />
        <CategoryGrid />
        <MySearchBar />
        <MainList />
        <PageNum />
      </div>
    )
  }
})


const mountNode = document.querySelector("#app")
ReactDOM.render(<App />, mountNode);

