import React from 'react'
import { ListView } from 'antd-mobile'

const data = [
  {
    img: 'http://mmbiz.qpic.cn/mmbiz_jpg/C8o4ricSxBiapAF3ImLf5hYBptehxB2krbyKQVjJqusU40JpOxdJr1hALGARm1IHq1zD65QNt3GMIWiablE1PkllQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1',
    title: '【展会推广】三个部门携手邀请您参加O2O电子商务博览会',
    des: '关于邀请参加首届京津冀o2o电子商务暨跨境商品博览会组织工作的函',
    href:'http://mp.weixin.qq.com/s?__biz=MzIxODYyMTc3OA==&tempkey=BAa82%2Beg6OJOHSCpDwAk%2BFoqSGSIKVF%2FJP2en%2FDK%2FPhselS6CgcaoCTYLu9qbWZCDD%2BdYuiFDwop11BPx7bQy44a0ImJP9WPp4WVlpATB1q%2BIpcrrqigfWSIJVexa1kEs4YywuyaknP4Eys6ywTPUQ%3D%3D&chksm=17e6f33220917a2423377be54a3e2df1d9b86fa67baca14f46700fdad4f14802c6d0724df307#rdt'
  },
  {
    img: 'http://mmbiz.qpic.cn/mmbiz_jpg/C8o4ricSxBiapAF3ImLf5hYBptehxB2krbDbvPiaokcvunV8AQEXibkStUt119NRQgGWk9L2Fv1swnnBPglRCWJRFg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1',
    title: '【展会推广】2016中国•山西•第二届 长治制造展销推介周成功举办',
    des: '10月15日，2016中国•山西•第二届长治制造展销推介周在长治市体育中心隆重开幕，来自省内外的357家企业的上千种产品集中展示了长治市近年来经济发展和科技创新工作取得的丰硕成果。本届长治制造展销推介周以“创新创造、品质品牌、开放交流',
    href:'http://mp.weixin.qq.com/s?__biz=MzIxODYyMTc3OA==&tempkey=BAa82%2Beg6OJOHSCpDwAk%2BFoqSGSIKVF%2FJP2en%2FDK%2FPi4%2F7MrFS5gsDsuMiBVroRbSyCuBqtf8Gcw%2F9F5MjfgXBUoMUQek4XgKqsQHc7sHfS%2BIpcrrqigfWSIJVexa1kE8Rd3YxB4pbrjW%2BlhflfvCw%3D%3D&chksm=17e6f33a20917a2c69855fa3692149c5338707158d884f24a087086f16d7b45cd46f4a3c0d4b#rd'
  },
  {
    img: 'http://mmbiz.qpic.cn/mmbiz_jpg/C8o4ricSxBiarIIvhmWOibWNJO9YyHsjQT7eQg5FLOa1g33Ud9JndasoNIcrKojvQqmwuic1g1Dp011VbWygUcaDqw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1',
    title: '【五省二市】山东省',
    des: '山东（ShanDong）省地处中国东部、黄河下游，省会城市济南市。位于北半球中纬度地带。陆地南北最长约420公里，东西最宽700余公里，面积15.7万平方公里。境域东临海洋，西接大陆。水平地形分为半岛和内陆两部分，东部的山东半岛突出于黄海、渤海之间，隔渤海海峡与辽东半岛遥遥相对，庙岛群岛（又称长山列岛）屹立在渤海海峡，是渤海与黄海的分界处，扼海峡咽喉，成为拱卫首都北京的重要海防门户。西部内陆部分自北而南依次与河北、河南、安徽、江苏4省接壤。',
    href:'http://mp.weixin.qq.com/s?__biz=MzIxODYyMTc3OA==&tempkey=BAa82%2Beg6OJOHSCpDwAk%2BFoqSGSIKVF%2FJP2en%2FDK%2FPgWNbub7gnHSdqj8oFHy8Une8uKDzolvLpRqums8CqqXZTUXublOsbX6xeu7WkVn2O%2BIpcrrqigfWSIJVexa1kEltvmg6TkNVHZ0h1FbIc4nA%3D%3D&chksm=17e6f31d20917a0b8be7344847aa749f7800154af2eb6a2ad6549a0d0501f45e5232ad26ea08#rd'
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
            <div style={{ display: 'inline-block',overflow:'hidden' }}>
              <h2 className={'title'}>{obj.title}</h2>
              <p className={'desc'} style={{margin:'5px 0 5px 0'}}>2016年11月1日</p>
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
        // renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
        //   {this.state.isLoading ? '加载中...' : '加载完毕'}
        // </div>}
        renderRow={row}
        renderSeparator={separator}
        className="fortest"
        pageSize={4}
        scrollRenderAheadDistance={500}
        scrollEventThrottle={20}
        onScroll={() => { console.log('scroll'); } }
        useBodyScroll
        // onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
        />
    )
  },
})

export default MainList
