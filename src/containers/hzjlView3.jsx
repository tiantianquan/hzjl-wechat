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

const HzjlView3 = React.createClass({
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
            <CategoryGrid.Item name={'协同发展'} path={'/hzjl3/category/京津冀协同发展'} />
            <CategoryGrid.Item name={'环渤海城市群'} path={'/hzjl3/category/环渤海城市群'} />
            <CategoryGrid.Item name={'两外机构'} path={'/hzjl3/category/两外机构'} />
            <CategoryGrid.Item name={'对口帮扶'} path={'/hzjl3/category/对口帮扶'} />
          </CategoryGrid.Row>
        </CategoryGrid>
        <MySearchBar getSearchListStart={this.props.actions.getSearchListStart} />
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

export default connect(mapStateToProps, mapDispatchToProps)(HzjlView3)


