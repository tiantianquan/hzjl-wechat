import React from 'react'
import { Pagination,Button } from 'antd-mobile'


//带入button样式
const testButton = ()=>(
  <Button/>
)

const PageNum = React.createClass({
  render() {
    return (
      <Pagination
        total={5}
        current={1}
        prevText={'上一页'}
        nextText={'下一页'}
        />
    )
  }
})

function a (aaa:string,bbb:string){

}

export default PageNum
