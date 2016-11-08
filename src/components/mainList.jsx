import React from 'react'
import { ListView } from 'antd-mobile'
import egData from '../api/egData'
import MainListRow from './mainListRow.jsx'
import Separator from './separator.jsx'


const MainList = React.createClass({
  componentWillMount() {
    this._bindDatatSource()
  },
  _bindDatatSource() {
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  },

  _renderSeparator(sectionID, rowID) {
    return (<Separator key={`${sectionID}-${rowID}`} />)
  },

  _renderRow(rowData, sectionID, rowID) {
    return (
      <MainListRow obj={rowData} key={rowID} />
    )
  },

  render() {
    const {articleList} = this.props
    return (
      <ListView
        dataSource={this.ds.cloneWithRows(articleList)}
        renderRow={this._renderRow}
        renderSeparator={this._renderSeparator}
        className="fortest"
        pageSize={4}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={20}
        useBodyScroll
        // onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
        />
    )
  },
})

export default MainList
