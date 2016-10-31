import React from 'react'
import { ListView } from 'antd-mobile'

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: '相约酒店',
    des: '不是所有的兼职汪都需要风吹日晒',
    href:'http://mp.weixin.qq.com/s?__biz=MzA3NTQwNDc3NA==&mid=401630061&idx=1&sn=03679bf4f7da85e79117dc4a7a82dae3&scene=19#wechat_redirect'
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: '麦当劳邀您过周末',
    des: '不是所有的兼职汪都需要风吹日晒',
    href:'http://mp.weixin.qq.com/s?__biz=MzA3NTQwNDc3NA==&mid=401630061&idx=1&sn=03679bf4f7da85e79117dc4a7a82dae3&scene=19#wechat_redirect'
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: '食惠周',
    des: '不是所有的兼职汪都需要风吹日晒不是所有的兼职汪都需要风吹日晒不是所有的兼职汪都需要风吹日晒不是所有的兼职汪都需要风吹日晒不是所有的兼职汪都需要风吹日晒不是所有的兼职汪都需要风吹日晒不是所有的兼职汪都需要风吹日晒不是所有的兼职汪都需要风吹日晒不是所有的兼职汪都需要风吹日晒不是所有的兼职汪都需要风吹日晒不是所有的兼职汪都需要风吹日晒不是所有的兼职汪都需要风吹日晒',
    href:'http://mp.weixin.qq.com/s?__biz=MzA3NTQwNDc3NA==&mid=401630061&idx=1&sn=03679bf4f7da85e79117dc4a7a82dae3&scene=19#wechat_redirect'
  },
]
let index = data.length - 1;

const NUM_ROWS = 20;
let pageIndex = 0;

const MainList = React.createClass({
  getInitialState() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })

    this.genData = (pIndex = 0) => {
      const dataBlob = {};
      for (let i = 0; i < NUM_ROWS; i++) {
        const ii = (pIndex * NUM_ROWS) + i;
        dataBlob[`${ii}`] = `row - ${ii}`;
      }
      return dataBlob;
    };
    this.rData = this.genData();
    return {
      dataSource: dataSource.cloneWithRows(this.rData),
      isLoading: false,
    }
  },

  onEndReached(event) {
    // load new data
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      Object.assign(this.rData, this.rData, this.genData(++pageIndex))
      // this.rData = { ...this.rData, ...this.genData(++pageIndex) }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      })
    }, 1000);
  },

  render() {
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        marginLeft: '10px',
        marginRight: '10px',
        // height:'3px',
        borderTop: '1px solid #ECECED',
      }}
        />
    )
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <a href={obj.href} key={rowID} className={'main-list-item'}
          style={{
            // padding: '8px 16px',
            // backgroundColor: 'white',
          }}
          >
          {/*<h3 style={{ padding: 2, marginBottom: 8, borderBottom: '1px solid #F6F6F6' }}>
            {obj.title}
          </h3>*/}
          <div style={{ display: '-webkit-box', display: 'flex' }}>
            <img style={{
              // height: 100 * (window.viewportScale || 1),
              // marginRight: 8
              marginRight: '10px',
              display: 'block',
              minWidth: '80px',
              height: '60px',
            }} src={obj.img} />
            <div style={{ display: 'inline-block' }}>
              <h2 className={'title'}>{obj.title}</h2>
              <p className={'desc'}>{obj.des}</p>
            </div>
          </div>
        </a>
      );
    };
    return (
      <ListView
        dataSource={this.state.dataSource}
        // renderHeader={() => <span>header</span>}
        renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '加载完毕'}
        </div>}
        renderRow={row}
        renderSeparator={separator}
        className="fortest"
        pageSize={4}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={20}
        onScroll={() => { console.log('scroll'); } }
        useBodyScroll
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
        />
    )
  },
})

export default MainList
