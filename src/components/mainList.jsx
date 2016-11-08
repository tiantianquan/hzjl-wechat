import React from 'react'
import { ListView } from 'antd-mobile'
import egData from '../api/egData'
import MainListRow from './mainListRow.jsx'
import Separator from './separator.jsx'

let data = egData

let index = data.length - 1

const NUM_ROWS = 20
let pageIndex = 0

const MainList = React.createClass({
  getInitialState() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })

    this.genData = (pIndex = 0) => {
      const dataBlob = {}
      for (let i = 0; i < NUM_ROWS; i++) {
        const ii = (pIndex * NUM_ROWS) + i
        dataBlob[`${ii}`] = `row - ${ii}`
      }
      return dataBlob
    }
    this.rData = this.genData()
    return {
      dataSource: dataSource.cloneWithRows(this.rData),
      isLoading: false,
    }
  },

  onEndReached(event) {
    this.setState({ isLoading: true })
    setTimeout(() => {
      Object.assign(this.rData, this.rData, this.genData(++pageIndex))
      // this.rData = { ...this.rData, ...this.genData(++pageIndex) }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      })
    }, 1000)
  },

  _renderSeparator(sectionID, rowID) {
    return (<Separator key={`${sectionID}-${rowID}`} />)
  },

  _renderRow(rowData, sectionID, rowID) {
    console.log(rowData)
    if (index < 0) {
      index = data.length - 1
    }
    const obj = data[index--]
    return (
      <MainListRow obj={obj} key={rowID} />
    )
  },

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
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
