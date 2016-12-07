import React from 'react'

import CategoryGrid from '../components/categoryGrid.jsx'
import MainView from './mainView.jsx'


const HzjlView2 = React.createClass({
  _renderCategory() {
    return (
      <CategoryGrid>
        <CategoryGrid.Row>
          <CategoryGrid.Item name={'招商动态'} path={'/hzjl2/category/招商动态'} />
          <CategoryGrid.Item name={'招商政策'} path={'/hzjl2/category/招商政策'} />
          <CategoryGrid.Item name={'招商项目'} path={'/hzjl2/category/招商项目'} />

        </CategoryGrid.Row>
      </CategoryGrid>
    )
  },
  render() {
    return (
      <MainView {...this.props} searchTag={'HZJL'} pageTitle={"招商行动"} renderCategory={this._renderCategory}>
      </MainView>
    )
  }
})

export default HzjlView2


