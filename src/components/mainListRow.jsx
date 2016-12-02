import React from 'react'

const MainListRow = React.createClass({
  _renderImg() {
    var {obj} = this.props
    if (!!obj.ThumbImgPath) {
      return (
        <div className={'img-wrapper'}>
          <img className={'item-img'} src={'/public' + obj.ThumbImgPath} />
        </div>
      )
    }
    else {
      return
    }
  },
  render() {
    var {obj, _rowId} = this.props
    return (
      <a href={obj.url} className={'main-list-item'} >
        <div className={"row-wrapper"}>
          {this._renderImg()}
          <div className={'item-des'}>
            <h2 className={'title'}>{obj.title}</h2>
            <p className={'desc'} style={{ margin: '5px 0 5px 0' }}>{obj.update_time.getFullYear() + '年' +
              (obj.update_time.getMonth() + 1) + '月' + obj.update_time.getDate() + '日'}</p>
            <p className={'desc'}>{obj.digest}</p>
          </div>
        </div>
      </a>
    )
  }
})

export default MainListRow