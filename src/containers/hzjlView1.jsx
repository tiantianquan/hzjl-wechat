import React from 'react'

import CategoryGrid from '../components/categoryGrid.jsx'
import HzjlView from './hzjlView.jsx'


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
       <HzjlView {...this.props} renderCategory={this._renderCategory}>
       </HzjlView>
    )
  }
})

export default HzjlView1


