import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import MainList from '../components/mainList.jsx'
import MySearchBar from '../components/searchBar.jsx'
import Nav from '../components/nav.jsx'

import actions from '../actions'

import '../style.css'

const HzjlView = React.createClass({
  _getArticleByCategoryName(categoryName) {
    this.props.actions.getArticleListStart(categoryName)
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
    const {isLoading, articleList} = this.props
    return (
      <div>
        <Nav title="天津市合作交流" goBack={this.props.router.goBack} />
          {this.props.renderCategory()} 
        <MySearchBar getSearchListStart={this.props.actions.getSearchListStart}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HzjlView)


