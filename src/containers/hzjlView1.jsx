import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import MainList from '../components/mainList.jsx'
import MySearchBar from '../components/searchBar.jsx'
import CategoryGrid from '../components/categoryGrid.jsx'
import Nav from '../components/nav.jsx'

import actions from '../actions'

// import 'antd-mobile/dist/antd-mobile.css'
import '../style.css'

const HzjlView1 = React.createClass({
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
        <Nav title="天津市交流合作" goBack={this.props.router.goBack} />
        <CategoryGrid>
          <CategoryGrid.Row>
            <CategoryGrid.Item name={'重点工作'} path={'/hzjl1/category/重点工作'} />
            <CategoryGrid.Item name={'工作规划'} path={'/hzjl1/category/工作规划'} />

          </CategoryGrid.Row>

        </CategoryGrid>
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

export default connect(mapStateToProps, mapDispatchToProps)(HzjlView1)


