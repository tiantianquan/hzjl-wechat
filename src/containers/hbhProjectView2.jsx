import React from 'react'

import CategoryGrid from '../components/categoryGrid.jsx'
import MainView from './mainView.jsx'


const HbhProjectView2 = React.createClass({
  _renderCategory() {
    return (
      <CategoryGrid>
        <CategoryGrid.Row>
          <CategoryGrid.Item name={'经贸产业'} path={'/hbhProject2/category/经贸产业'} />
          {/*<CategoryGrid.Item name={'科技人才'} path={'/hbhProject2/category/科技人才'} />*/}
          <CategoryGrid.Item name={'展会推广'} path={'/hbhProject2/category/展会推广'} />
          <CategoryGrid.Item name={'会议活动'} path={'/hbhProject2/category/重要会议'} />
        </CategoryGrid.Row>
      </CategoryGrid>
    )
  },
  render() {
    return (
      <MainView {...this.props} searchTag={'HBH'} pageTitle={"区域要闻"} renderCategory={this._renderCategory}>
      </MainView>
    )
  }
})

export default HbhProjectView2