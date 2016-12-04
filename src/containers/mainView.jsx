import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import MainList from '../components/mainList.jsx'
import MySearchBar from '../components/searchBar.jsx'
import Nav from '../components/nav.jsx'

import actions from '../actions'

import '../style.scss'

const MainView = React.createClass({
  _getArticleByCategoryName(categoryName) {
    this.props.actions.getArticleListStart(categoryName)
  },

  _getSearchListStart(searchText) {
    var searchTag = this.props.searchTag
    return () => {
       this.props.actions.getSearchListStart(searchText,searchTag)
    }
  },
  componentWillMount() {
    this._getArticleByCategoryName(this.props.categoryName)
  },
  componentWillReceiveProps(nextProps) {
    if (this.props.categoryName !== nextProps.categoryName) {
      this._getArticleByCategoryName(nextProps.categoryName)
    }
  },
  render() {
    const {isLoading, articleList, pageTitle, renderCategory} = this.props
    return (
      <div>
        <Nav title={pageTitle} goBack={this.props.router.goBack} />
        {renderCategory()}
        <MySearchBar getSearchListStart={this._getSearchListStart} />
        <MainList articleList={articleList} isLoading={isLoading} />
        {/*!isLoading ? <PageNum /> : null*/}
      </div>
    )
  }
})

function mapStateToProps(state, ownProps) {
  return {
    ...state.rootReducer,
    categoryName: ownProps.params.categoryName
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)


