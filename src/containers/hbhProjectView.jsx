import React from 'react'

import CategoryGrid from '../components/categoryGrid.jsx'
import MainView from './mainView.jsx'


const HbhProjectView = React.createClass({
  _renderCategory() {
    return (
      <CategoryGrid>
        <CategoryGrid.Row>
          <CategoryGrid.Item name={'市长联席会'} path={'/hbhProject/category/市长联席会'} />
          <CategoryGrid.Item name={'区域合作'} path={'/hbhProject/category/区域合作'} />
          <CategoryGrid.Item name={'经贸产业'} path={'/hbhProject/category/经贸产业'} />
        </CategoryGrid.Row>
        <CategoryGrid.Row>
          <CategoryGrid.Item name={'科技人才'} path={'/hbhProject/category/科技人才'} />
          <CategoryGrid.Item name={'展会推广'} path={'/hbhProject/category/展会推广'} />
          <CategoryGrid.Item name={'重要会议'} path={'/hbhProject/category/重要会议'} />
        </CategoryGrid.Row>
      </CategoryGrid>
    )
  },
  render() {
    return (
      <MainView {...this.props} searchTag={'HBH'} pageTitle={"环渤海区域合作"} renderCategory={this._renderCategory}>
      </MainView>
    )
  }
})

export default HbhProjectView