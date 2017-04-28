import React from 'react'

import CategoryGrid from '../components/categoryGrid.jsx'
import MainView from './mainView.jsx'

const HbhCityView = React.createClass({
  _renderCategory() {
    return (
      <CategoryGrid>
        <CategoryGrid.Row>
          <CategoryGrid.Item name={'五省二市'} path={'/hbhcity/category/五省二市'} />
          <CategoryGrid.Item name={'成员市'} path={'/hbhcity/category/成员市'} />
        </CategoryGrid.Row>
      </CategoryGrid>
    )
  },
  render() {
    return (
      <MainView
        {...this.props}
        searchTag={'HBH'}
        pageTitle={'区域概况'}
        renderCategory={this._renderCategory}
      />
    )
  }
})

export default HbhCityView
