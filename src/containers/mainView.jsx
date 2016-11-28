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

const CONFIG = {
  /**
   * 每页条数
   */
  perPage: 10
}


const MainView = React.createClass({
  _getArticleByCategoryName(categoryName) {
    console.log(categoryName)
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
        <Nav title="环渤海" goBack={this.props.router.goBack} />
        <CategoryGrid>
          <CategoryGrid.Row>
            <CategoryGrid.Item name={'市长联席会'} path={'/category/mayor'} />
            <CategoryGrid.Item name={'区域合作'} path={'/category/cooperation'} />
            <CategoryGrid.Item name={'经济产业'} path={'/category/economy'} />
          </CategoryGrid.Row>
          <CategoryGrid.Row>
            <CategoryGrid.Item name={'科技人才'} path={'/category/technology'} />
            <CategoryGrid.Item name={'展会推广'} path={'/category/exhibition'} />
            <CategoryGrid.Item name={'重要会议'} path={'/category/meeting'} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MainView)


