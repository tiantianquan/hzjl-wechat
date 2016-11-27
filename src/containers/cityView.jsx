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

const CityView = React.createClass({
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
        <Nav goBack={this.props.router.goBack} />
        <CategoryGrid>
          <CategoryGrid.Row>
            <CategoryGrid.Item name={'五省二市'} path={'/city/category/province'} />
            <CategoryGrid.Item name={'成员市'} path={'/city/category/city'} />
          </CategoryGrid.Row>
        </CategoryGrid>
        <MySearchBar />
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

export default connect(mapStateToProps, mapDispatchToProps)(CityView)


