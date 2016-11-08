import React from 'react'

const MainListRow = ({obj, rowID}) => (
  <a href={obj.href} className={'main-list-item'} >
    <div style={{ display: '-webkit-box', display: 'flex' }}>
      <img style={{
        marginRight: '10px',
        display: 'block',
        minWidth: '80px',
        height: '60px',
      }} src={obj.img} />
      <div style={{ display: 'inline-block', overflow: 'hidden' }}>
        <h2 className={'title'}>{obj.title}</h2>
        <p className={'desc'} style={{ margin: '5px 0 5px 0' }}>2016年11月1日</p>
        <p className={'desc'}>{obj.des}</p>
      </div>
    </div>
  </a>
)

export default MainListRow