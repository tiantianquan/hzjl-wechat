import React from 'react'
import { SearchBar } from 'antd-mobile'

const MySearchBar = React.createClass({
  getInitialState() {
    return {
      searchText: '',
    }
  },
  onChange(value) {
    this.setState({ searchText:value })
  },
  render() {
    return (
      <SearchBar
        value={this.state.searchText}
        placeholder="搜索"
        // onCancel={(searchValue) => { alert(`${searchValue}, 取消事件自定`) } }
        cancelText="取消"
        // showCancelButton
        onChange={this.onChange}
        />
    )
  },
})

export default MySearchBar