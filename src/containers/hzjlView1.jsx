import React from 'react'

import CategoryGrid from '../components/categoryGrid.jsx'
import MainView from './mainView.jsx'


const HzjlView1= React.createClass({
  _renderCategory(){
    return(
        <CategoryGrid>
          <CategoryGrid.Row>
            <CategoryGrid.Item name={'重点工作'} path={'/hzjl1/category/重点工作'} />
            <CategoryGrid.Item name={'工作规划'} path={'/hzjl1/category/工作规划'} />
          </CategoryGrid.Row>
        </CategoryGrid>
    )
  },

  render(){
    return(
       <MainView {...this.props} searchTag={'HZJL'} pageTitle={"天津市合作交流"} renderCategory={this._renderCategory}>
       </MainView>
    )
  }
})

export default HzjlView1


