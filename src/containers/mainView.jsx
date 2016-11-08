import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import MainList from '../components/mainList.jsx'
import MySearchBar from '../components/searchBar.jsx'
import CategoryGrid from '../components/categoryGrid.jsx'
import PageNum from '../components/pageNum.jsx'
import Nav from '../components/nav.jsx'

import actions from '../actions'

// import 'antd-mobile/dist/antd-mobile.css'
import '../style.css'


const MainView = React.createClass({
  componentWillMount() {
    this.props.actions.getArticleListStart(1, 10)
  },

  render() {
    const {isLoading, articleList} = this.props
    return (
      <div>
        <Nav />
        <CategoryGrid />
        <MySearchBar />
        <MainList articleList={articleList} isLoading={isLoading} />
        {!isLoading ? <PageNum /> : null}

      </div>
    )
  }
})

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)


