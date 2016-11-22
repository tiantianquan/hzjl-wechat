/**
 * 地图对象
 */
var map = new BMap.Map(
  "allmap", {
    //最小缩放
    // minZoom: 7,
    //最大缩放
    // maxZoom: 10
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
  var point = new BMap.Point(this.x, this.y)
  var marker = new BMap.Marker(point)

  var opts = {
    position: new BMap.Point(this.x, this.y), // 指定文本标注所在的地理位置
    offset: new BMap.Size(0, 28) //设置文本偏移量
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
    marker.addEventListener('click',function(){
      alert(1)
    })
  map.addOverlay(marker)
}


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
    Province.list.push(this)
  }
  /**
   * 省市列表
   */
Province.list = []

/**
 * 获取省市边界
 */
Province.prototype.getBoundary = function () {
  var boundary = new BMap.Boundary()
  var that = this
  boundary.get(this.name, function (rs) {
    var pointArray = []
    for (var i = 0; i < rs.boundaries.length; i++) {
      var ply = that.drawMapBoundary(rs.boundaries[i])
      map.addOverlay(ply)
      that.registEvent(ply)
        // pointArray = pointArray.concat(ply.getPath())
    }
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
    e.preventDefault()
    return
  })
}

/**
 * 省市名称水印
 */
Province.prototype.addName = function () {
  var opts = {
    position: new BMap.Point(this.x, this.y), // 指定文本标注所在的地理位置
    offset: new BMap.Size(-15, -15) //设置文本偏移量
  }
  var label = new BMap.Label(this.name, opts) // 创建文本标注对象
  label.setStyle({
    color: "#fff",
    fontSize: "15px",
    // height: "20px",
    // lineHeight: "2px",
    fontFamily: "微软雅黑",
    backgroundColor: null,
    border: null,
    opacity: 0.5,
  })
  this.registEvent(label)
  map.addOverlay(label)
}

//渲染-----------------------------------------------------------------------

/**
 * 渲染省
 */
function renderProvince() {
  for (var i = provinceData.length - 1; i >= 0; i--) {
    var provinceBaidu = provinceData[i]
    var province = new Province(provinceBaidu, {
      strokeWeight: null,
      strokeColor: '#9e9a9a',
      fillColor: provinceBaidu.fillColor,
      fillOpacity: 0.3,
      strokeOpacity: 0.1
    })
    province.getBoundary()

    // if (province.name !== '北京' && province.name !== '天津') {
    province.addName()
      // }
  }
}

/**
 * 渲染市
 */
function renderCity() {
  for (var i = 0; i < cityData.length; i++) {
    var cityStr = cityData[i]
    var city = new City(cityStr)
    city.addMarker()
  }
}

renderProvince()
// renderCity()


map.addEventListener('touchend', function (e) {
  console.log(e)
  e.domEvent.srcElement.click()
})