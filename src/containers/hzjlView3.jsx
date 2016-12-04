import React from 'react'

import CategoryGrid from '../components/categoryGrid.jsx'
import MainView from './mainView.jsx'


const HzjlView3 = React.createClass({
  _renderCategory() {
    return (
      <CategoryGrid>
        <CategoryGrid.Row>
          <CategoryGrid.Item name={'京津冀协同发展'} path={'/hzjl3/category/京津冀协同发展'} />
          <CategoryGrid.Item name={'环渤海城市群'} path={'/hzjl3/category/环渤海城市群'} />
          <CategoryGrid.Item name={'两外机构'} path={'/hzjl3/category/两外机构'} />
          <CategoryGrid.Item name={'对口帮扶'} path={'/hzjl3/category/对口帮扶'} />
        </CategoryGrid.Row>
      </CategoryGrid>
    )
  },
  render() {
    return (
      <MainView {...this.props} searchTag={'HZJL'} pageTitle={"天津市合作交流"} renderCategory={this._renderCategory}>
      </MainView>
    )
  }
})

export default HzjlView3


