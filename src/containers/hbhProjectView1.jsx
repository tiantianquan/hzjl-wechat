import React from 'react'

import CategoryGrid from '../components/categoryGrid.jsx'
import MainView from './mainView.jsx'


const HbhProjectView1 = React.createClass({
  _renderCategory() {
    return (
      <CategoryGrid>
        <CategoryGrid.Row>
          <CategoryGrid.Item name={'市长联席会'} path={'/hbhProject1/category/市长联席会'} />
          <CategoryGrid.Item name={'区域合作组织'} path={'/hbhProject1/category/区域合作组织'} />
        </CategoryGrid.Row>
      </CategoryGrid>
    )
  },
  render() {
    return (
      <MainView {...this.props} searchTag={'HBH'} pageTitle={'走进渤海'} renderCategory={this._renderCategory}>
      </MainView>
    )
  }
})

export default HbhProjectView1