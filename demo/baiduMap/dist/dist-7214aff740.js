/**
 * 省市类
 */
var Province = function (baiduData, opt) {
    getXYZ.call(this, baiduData)
    for (var key in opt) {
      if (opt.hasOwnProperty(key)) {
        this[key] = opt[key];
      }
    }
    /**
     * 覆盖物列表
     */
    this.plys = []
    Province.list.push(this)
  }
  /**
   * 省市列表
   */
Province.list = []

/**
 * 获取省市边界
 */
Province.prototype.getBoundary = function (cb) {
  var boundary = new BMap.Boundary()
  var that = this
  boundary.get(this.name, function (rs) {
    for (var i = 0; i < rs.boundaries.length; i++) {
      var ply = that.drawMapBoundary(rs.boundaries[i])
      that.plys.push(ply)
        // pointArray = pointArray.concat(ply.getPath())
    }
    cb()
  })
}

/**
 * 填充省市
 */
Province.prototype.drawMapBoundary = function (boundary) {
  var ply = new BMap.Polygon(boundary, {
      strokeWeight: this.strokeWeight,
      strokeColor: this.strokeColor,
      fillColor: this.fillColor,
      strokeOpacity: this.strokeOpacity,
      fillOpacity: this.fillOpacity
    }) //建立多边形覆盖物
  return ply
}

/**
 * 注册事件
 */
Province.prototype.registEvent = function (overlay) {
  var that = this
  overlay.addEventListener('click', function (e) {
    console.log(e)
  })
}

/**
 * 省市名称水印
 */
Province.prototype.addName = function () {
  if(!!this.nameLabel){
    this.nameLabel.show()
    return
  }

  var opts = {
    position: new BMap.Point(this.x, this.y), // 指定文本标注所在的地理位置
    offset: new BMap.Size(-15, -15) //设置文本偏移量
  }
  var label = new BMap.Label(this.name, opts) // 创建文本标注对象
  label.setStyle({
    color: "#000",
    fontSize: "15px",
    // height: "20px",
    // lineHeight: "2px",
    fontFamily: "微软雅黑",
    backgroundColor: null,
    border: null,
    opacity: 0.7,
  })
  this.nameLabel = label
  map.addOverlay(label)
}

Province.prototype.getPointInProvinces = function (point) {
  var flag = false
  this.plys.forEach(function (ply) {
    if (ply.containPoint(point)) {
      flag = true
    }
  })
  return flag
}

Province.prototype.clearOverlay = function () {
  this.plys.forEach(function (p) {
    // map.removeOverlay(p)
    p.hide()
  })
  // map.removeOverlay(this.nameLabel)
  this.nameLabel.hide()
}

Province.prototype.addPly = function () {
  var that = this
  if (this.plys.length === 0) {
    this.getBoundary(function () {
      that.plys.forEach(function (ply) {
        map.addOverlay(ply)
      })
    })
  } else {
    this.plys.forEach(function (ply) {
      // map.addOverlay(ply)
      ply.show()
    })
  }
}

Province.prototype.addOverlay = function () {
  this.addPly()
  this.addName()
}

/**
 * 点所在省
 */
Province.getPointInProvinces = function (point) {
  var resP
  Province.list.forEach(function (p) {
    p.plys.forEach(function (ply) {
      if (ply.containPoint(point)) {
        resP = p
      }
    })

  })
  return resP
}

Province.addName = function () {
  Province.list.forEach(function (p) {
    p.addName()
  })
}

Province.addPly = function () {
  Province.list.forEach(function (p) {
    p.addPly()
  })
}

Province.addOverlay = function () {
  Province.list.forEach(function (p) {
    p.addOverlay()
  })
}

Province.clearOverlay = function () {
  Province.list.forEach(function (p) {
    p.clearOverlay()
  })
}
/**
 * 
digest: "拟建设温泉酒店、商业中心、商住、公寓、住宅、影院等。"
show_cover_pic: "0"
thumb_media_id : "X1yhfcSZLEY18SUx0nazubFp3QP64Wh8GKTY_qeCfYY"
thumb_url : "http://mmbiz.qpic.cn/mmbiz_jpg/C8o4ricSxBiao8DKnpwBwdV7m8SLJOqrlw5Y4RTbictFyL9MP6HvESKgoTrCgiaESWsoubN2F1buogM1wvTMibdxPPw/0?wx_fmt=jpeg"
title : "【葫芦岛】兴城滨海温泉新城商业综合体项目"
url : "http://mp.weixin.qq.com/s?
 */

//var url = 'http://localhost:9999/api/News/GetMapNewsByCategory?category='

 var url = 'http://wx.jjhz-tj.gov.cn/api/News/GetMapNewsByCategory?category='

var formatData = function (res) {
  res = JSON.parse(res)
  var data = []
  res.forEach(function (d) {
    item = d
    data.push({
      url: item.url,
      title: item.title,
      digest: item.digest,
      thumb_url: item.thumb_url,
      update_time: new Date(item.update_time),
      thumbImgPath: item.ThumbImgPath
    })
  })

  return data
}

var Project = {}

Project.showList = function () {
  $('.project-wrapper').show()
}

Project.hideList = function () {
  $('.project-wrapper').hide()
}

Project.getAll = function (cityName, category, cb) {
  var getUrl = url+cityName
  if(!!category){
    getUrl += '&mapCategory='+category
  }
  $.get(getUrl, function (res) {
    cb(formatData(res))
  })
}

Project.ctrlDom = function (data) {

  var imageUrl = '/image/normal.jpg'

  function replTempl(item) {
    if (!item.thumbImgPath) {
      item.thumbImgPath = imageUrl
    } else {
      item.thumbImgPath = '/public' + item.thumbImgPath
    }

//     var templ =
//       `
//      <a href=${item.url} class="main-list-item">
//   <div class="project-list-row">
//     <div style="
//          background-image:url('${item.thumbImgPath}');
//           " class="project-list-row-img"/>
//     <div class="desc-wrapper">
//       <h2 class="title">${item.title}</h2>
//       <p class="desc digest" >${item.update_time.getFullYear()+'年'+ (item.update_time.getMonth()+1)+'月'+item.update_time.getDate()+'日'}
//       </p>
//       <p class="desc">${item.digest}</p>
//     </div>
//   </div>
// </a>`



    var templ =  '\n     <a href=' + item.url + ' class="main-list-item">\n  <div class="project-list-row">\n    <div style="\n         background-image:url(\'' + item.thumbImgPath + '\');\n          " class="project-list-row-img"/>\n    <div class="desc-wrapper">\n      <h2 class="title">' + item.title + '</h2>\n      <p class="desc digest" >' + (item.update_time.getFullYear() + '年' + (item.update_time.getMonth() + 1) + '月' + item.update_time.getDate() + '日') + '\n      </p>\n      <p class="desc">' + item.digest + '</p>\n    </div>\n  </div>\n</a>'

    return templ
  }

  if (data.length === 0) {
    $('.project-list').append(
      '<span class="no-content">无内容</span>'
    )
  } else {
    data.forEach(function (d) {
      $('.project-list').append(replTempl(d))
    })
  }
}

Project.removeDom = function () {
  $('.project-list').children().remove()
}

Project.showLoading = function () {
  $('.project-loading').show()
}

Project.hideLoading = function () {
  $('.project-loading').hide()
}

Project.bindTopBarEvent = function () {
  $('.top-grid-item.project').on('click', function () {
    Project.showRowItem(null)
  })


  $('.top-grid-item.policy').on('click', function () {
    Project.showRowItem('投资政策')
  })
}

Project.showRowItem = function (category) {
  Project.focusTopbarItem(category)
  Project.removeDom()
  Project.showList()
  Project.showLoading()
  Project.getAll(Project.cityName, category, function (d) {
    // if (category == 'policy') {
    //   d = []
    // }
    setTimeout(function () {
      Project.ctrlDom(d)
      Project.hideLoading()
    }, 500)

  })


}

Project.focusTopbarItem = function (category) {
  $('.top-grid-item').css('background', '#fff')
  $('.top-grid-item').css('color', '#000')
  $('.top-grid-item.' + category).css('background', '#1e90ff')
  $('.top-grid-item.' + category).css('color', '#fff')
}


Project.bindTopBarEvent()
function initBar() {
  $('.back-btn').text('地图')
  changeBarText('五省二市')
}


/**
 * 返回按钮绑定事件
 */
function back() {
  // if (!preState.Province)
  //   return
  changePage(function () {
    map.disableDragging()
    map.centerAndZoom('北京', 6)
    City.clearMarker()
    Province.clearOverlay()
    Province.addOverlay()

    initBar()
  })

  preState.Province = null
}

function changeBtnText(txt) {
  $('.back-btn').text(txt)
}


function changeBarText(txt) {
  $('.province-name').text(txt)
}


function zoomProvince(point) {
  var p = Province.getPointInProvinces(point)
  if(preState.Province === p)
    return
  if (!!p) {
    clearOverlay()
    changePage(function () {
      if(p.name==='内蒙古'){
        map.enableDragging()
      }
      else{
        map.disableDragging()
      }
      map.centerAndZoom(p.viewCenter || p.name, p.viewZ)
      City.list.forEach(function (c) {
        if (!!p.getPointInProvinces(new BMap.Point(c.x, c.y))) {
          c.addMarker()
        }
      })
      p.addPly()
      changeBarText(p.name)
      changeBtnText('返回')
    })
  }

  preState.Province = p
}

function changePage(cb) {
  // $('.mask').show()
  $('.mask').addClass('mask-show')
  cb()
  setTimeout(function () {
    $('.mask').removeClass('mask-show')
    $('.mask').addClass('mask-hide')
    setTimeout(function () {
      $('.mask').removeClass('mask-hide')
    }, 500)
  }, 500)
}


function clearOverlay() {
  City.clearMarker()
  Province.clearOverlay()
}



/**
 * 格式化百度数据
 * 
 * @param {any} baiduData
 */
function getXYZ(baiduData) {
  this.name = baiduData.n
  var xyz = baiduData.g.split(',')
  this.x = xyz[0]
  var yz = xyz[1].split('|')
  this.y = yz[0]
  this.z = yz[1]
}

/**
 * 城市类
 */
var City = function (baiduData, opt) {
  getXYZ.call(this, baiduData)
  for (var key in opt) {
    if (opt.hasOwnProperty(key)) {
      this[key] = opt[key];
    }
  }
  City.list.push(this)
}

/**
 * 城市列表
 */
City.list = []

/**
 * 添加标记
 */
City.prototype.addMarker = function () {
  if (!!this.marker) {
    this.marker.show()
    return
  }

  var point = new BMap.Point(this.x, this.y)
  var marker = new BMap.Marker(point)

  var xOffset = 0
  if (this.name.length >= 4) {
    xOffset = -20
  }
  var opts = {
    position: new BMap.Point(this.x, this.y), // 指定文本标注所在的地理位置
    offset: new BMap.Size(xOffset, 28) //设置文本偏移量
  }
  var label = new BMap.Label(this.name, opts) // 创建文本标注对象
  label.setStyle({
    color: "black",
    fontSize: "12px",
    height: "20px",
    lineHeight: "20px",
    fontFamily: "微软雅黑",
    backgroundColor: null,
    border: null
  })
  marker.setLabel(label)

  map.addOverlay(marker)
  this.marker = marker
  this.registMarkerClick()
}

City.prototype.clearMarker = function () {
  // map.removeOverlay(this.marker)
  if (!!this.marker) {
    this.marker.hide()
  }
}

City.prototype.registMarkerClick = function () {
  var that = this
    // this.marker.addEventListener('click', function () {
    //   console.log(1)
    //   Project.removeDom()
    //   Project.showList()
    //   Project.showLoading()
    //   Project.getAll(that.name, function (d) {
    //     Project.ctrlDom(d)
    //     Project.hideLoading()
    //   })
    // })

  this.marker.touch = function () {
    Project.cityName = that.name
    Project.showRowItem(null)
  }
}



/**
 * 清除所有标记
 */
City.clearMarker = function () {
  City.list.forEach(function (c) {
    c.clearMarker()
  })
}

City.addMarker = function () {
  City.list.forEach(function (c) {
    c.addMarker()
  })
}
var provinceData = [{
  n: "北京",
  g: "116.395645,39.929986|12",
  fillColor: "#1abc9c",
  viewZ: 9
}, {
  n: "天津",
  g: "117.210813,39.14393|12",
  fillColor: "#2ecc71",
  viewZ: 9
}, {
  "n": "山东",
  "g": "118.527663,36.09929|8",
  fillColor: '#3498db',
  viewZ: 7,
  viewCenter: '潍坊'
}, {
  "n": "山西",
  "g": "112.515496,37.866566|7",
  fillColor: '#9b59b6',
  viewZ: 7
}, {
  "n": "辽宁",
  "g": "122.753592,41.6216|8",
  fillColor: '#34495e',
  viewZ: 7
}, {
  "n": "内蒙古",
  "g": "114.415868,43.468238|5",
  fillColor: '#95a5a6',
  viewZ: 6
}, {
  "n": "河北",
  "g": "115.661434,38.61384|7",
  fillColor: '#e67e22',
  viewZ: 7,
  viewCenter: '沧州'
},{
    n: "河南",
    g: "113.486804,34.157184|7",
    fillColor:'#d4d4d4',
    viewZ:7,
    viewCenter:'郑州'
  }]


var cityData = [{
  n: "北京",
  g: "116.395645,39.929986|12"
}, {
  n: "天津",
  g: "117.210813,39.14393|12"
}, {
  n: '大连',
  g: '121.593478,38.94871|12'
}, {
  n: '沈阳',
  g: '123.432791,41.808645|12'
}, {
  n: '丹东',
  g: '124.338543,40.129023|12'
}, {
  n: '营口',
  g: '122.233391,40.668651|13'
}, {
  n: '锦州',
  g: '121.147749,41.130879|13'
}, {
  n: '盘锦',
  g: '122.073228,41.141248|13'
}, {
  n: '葫芦岛',
  g: '120.860758,40.74303|13'
}, {
  n: '阜新',
  g: '121.660822,42.01925|14'
}, {
  n: '朝阳',
  g: '120.446163,41.571828|13'
}, {
  n: '石家庄',
  g: '114.522082,38.048958|12'
}, {
  n: '秦皇岛',
  g: '119.604368,39.945462|12'
}, {
  n: '保定',
  g: '115.49481,38.886565|13'
}, {
  n: '唐山',
  g: '118.183451,39.650531|13'
}, {
  n: '沧州',
  g: '116.863806,38.297615|13'
}, {
  n: '承德',
  g: '117.933822,40.992521|14'
}, {
  n: '邢台',
  g: '114.520487,37.069531|13'
}, {
  n: '邯郸',
  g: '114.482694,36.609308|13'
}, {
  n: '廊坊',
  g: '116.703602,39.518611|13'
}, {
  n: '衡水',
  g: '115.686229,37.746929|13'
}, {
  n: '青岛',
  g: '120.384428,36.105215|12'
}, {
  n: '济南',
  g: '117.024967,36.682785|12'
}, {
  n: '滨州',
  g: '117.968292,37.405314|12'
}, {
  n: '德州',
  g: '116.328161,37.460826|12'
}, {
  n: '东营',
  g: '118.583926,37.487121|12'
}, {
  n: '潍坊',
  g: '119.142634,36.716115|12'
}, {
  n: '烟台',
  g: '121.309555,37.536562|12'
}, {
  n: '威海',
  g: '122.093958,37.528787|13'
}, {
  n: '淄博',
  g: '118.059134,36.804685|12'
}, {
  n: '聊城',
  g: '115.986869,36.455829|12'
}, {
  n: '日照',
  g: '119.50718,35.420225|12'
}, {
  n: '枣庄',
  g: '117.279305,34.807883|13'
}, {
  n: '太原',
  g: '112.550864,37.890277|12'
}, {
  n: '长治',
  g: '113.120292,36.201664|12'
}, {
  n: '忻州',
  g: '112.727939,38.461031|12'
}, {
  n: '大同',
  g: '113.290509,40.113744|12'
}, {
  n: '晋城',
  g: '112.867333,35.499834|13'
}, {
  n: '阳泉',
  g: '113.569238,37.869529|13'
}, {
  n: '呼和浩特',
  g: '111.660351,40.828319|12'
}, {
  n: '通辽',
  g: '122.260363,43.633756|12'
}, {
  n: '包头',
  // g: '109.846239,40.647119|12'
  g: '109.938741,41.060912|12'
}, {
  n: '呼伦贝尔',
  g: '119.760822,49.201636|12'
}, {
  n: '鄂尔多斯',
  g: '109.993706,39.81649|12'
}, {
  n: '赤峰',
  g: '118.930761,42.297112|12'
}, {
  n: '乌兰察布',
  g: '113.112846,41.022363|12'
}, {
  n: '锡林郭勒盟',
  g: '116.02734,43.939705|11'
}, {
  n: '巴彦淖尔',
  g: '107.423807,40.76918|12'
}, {
  n: '安阳',
  g: '114.351807,36.110267|12'
}, {
  n: '濮阳',
  g: '115.026627,35.753298|12'
},{
  n:'满洲里',
  g:'117.379043,49.605374|12'
}]
var mapStyle = [{
    "featureType": "road",
    "elementType": "all",
    "stylers": {
      "visibility": "off"
    }
  }, {
    "featureType": "poi",
    "elementType": "all",
    "stylers": {
      "visibility": "off"
    }
  },

  {
    "featureType": "label",
    "elementType": "all",
    "stylers": {
      "visibility": "off"
    }
  }
]


var city = {
  name: '天津市',
  x: 117.210813,
  y: 39.14393,
  z: 12,
}

var province = {
  name: '天津',
  x: 117.210813,
  y: 39.14393,
  z: 12,
  strokeWeight: 2,
  strokeColor: '#000000',
  fillColor: '#ffffff'
}
/**
 * 地图对象
 */
var map = new BMap.Map(
  "allmap", {
    //最小缩放
    // minZoom: 7,
    //最大缩放
    maxZoom: 9
  }
)
map.centerAndZoom('北京', 6)
map.disableScrollWheelZoom()
map.disableDragging()
map.disableDoubleClickZoom()
map.disablePinchToZoom()

map.setMapStyle({
  styleJson: mapStyle
})

/**
 * 之前的状态
 */
var preState = {}



// Project.removeDom()
// Project.showList()
// Project.showLoading()
// Project.getAll('保定',null, function (d) {
//   setTimeout(function () {
//     Project.ctrlDom(d)
//     Project.hideLoading()

//   }, 500)

// })



//渲染-----------------------------------------------------------------------

/**
 * 渲染省
 */
function initProvince() {
  for (var i = provinceData.length - 1; i >= 0; i--) {
    var provinceBaidu = provinceData[i]
    var province = new Province(provinceBaidu, {
      strokeWeight: null,
      strokeColor: '#9e9a9a',
      fillColor: provinceBaidu.fillColor,
      fillOpacity: 0.3,
      strokeOpacity: 0.1,
      viewZ: provinceBaidu.viewZ,
      viewCenter: provinceBaidu.viewCenter
    })
  }
}

/**
 * 渲染市
 */
function initCity() {
  for (var i = 0; i < cityData.length; i++) {
    var cityStr = cityData[i]
    var city = new City(cityStr)
  }
}


initProvince()
initCity()
Province.addOverlay()

initBar()

var touchstartTime
var touchendTime

map.addEventListener('touchstart', function (e) {
  // e.domEvent.srcElement.click()
  touchstartTime = Date.now()

})

map.addEventListener('touchend', function (e) {
  touchendTime = Date.now()
  var span = touchendTime - touchstartTime
  if (span < 500) {
    if (!!e.overlay && !!e.overlay.touch) {
      e.overlay.touch()
    } else {
      zoomProvince(e.point)
    }
    return
  }

})

/**
 * 绑定返回按钮事件
 */
$('.back-btn').on('click', back)

/**
 * 关闭列表
 */
$('.close-btn').on('click', Project.hideList)