var map = new BMap.Map(
  "allmap", {
    //最小缩放
    minZoom: 7,
    //最大缩放
    maxZoom: 10
  }
)
map.centerAndZoom('北京', 7)
map.enableScrollWheelZoom(true)

map.setMapStyle({
  styleJson: mapStyle
})


function getXYZ(baiduData) {
  this.name = baiduData.n
  var xyz = baiduData.g.split(',')
  this.x = xyz[0]
  var yz = xyz[1].split('|')
  this.y = yz[0]
  this.z = yz[1]
}

// var city = {
//   name: '天津市',
//   x: 117.210813,
//   y: 39.14393,
//   z: 12,
// }
var City = function (baiduData, opt) {
  getXYZ.call(this, baiduData)
  for (var key in opt) {
    if (opt.hasOwnProperty(key)) {
      this[key] = opt[key];
    }
  }
  City.list.push(this)
}
City.list = []

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
  map.addOverlay(marker)
}


// var province = {
//   name: '天津',
//   x: 117.210813,
//   y: 39.14393,
//   z: 12,
//   strokeWeight: 2,
//   strokeColor: '#000000',
//   fillColor: '#ffffff'
// }
var Province = function (baiduData, opt) {
  getXYZ.call(this, baiduData)
  for (var key in opt) {
    if (opt.hasOwnProperty(key)) {
      this[key] = opt[key];
    }
  }
  Province.list.push(this)
}
Province.list = []

Province.prototype.getBoundary = function () {
  var boundary = new BMap.Boundary()
  var that = this
  boundary.get(this.name, function (rs) {
    var pointArray = []
    for (var i = 0; i < rs.boundaries.length; i++) {
      var ply = new BMap.Polygon(rs.boundaries[i], {
          strokeWeight: that.strokeWeight,
          strokeColor: that.strokeColor,
          fillColor: that.fillColor,
          strokeOpacity: that.strokeOpacity,
          fillOpacity: that.fillOpacity
        }) //建立多边形覆盖物
      map.addOverlay(ply)
      pointArray = pointArray.concat(ply.getPath());
    }
  })
}
Province.prototype.addName = function () {
  var opts = {
    position: new BMap.Point(this.x, this.y), // 指定文本标注所在的地理位置
    offset: new BMap.Size(-50, -50) //设置文本偏移量
  }
  var label = new BMap.Label(this.name, opts) // 创建文本标注对象
  label.setStyle({
    color: "#fff",
    fontSize: "50px",
    // height: "20px",
    // lineHeight: "2px",
    fontFamily: "楷体",
    backgroundColor: null,
    border: null,
    opacity:0.5,
  })
  map.addOverlay(label)
}

for (var i = provinceData.length - 1; i >= 0; i--) {
  var provinceBaidu = provinceData[i]
  var province = new Province(provinceBaidu, {
    strokeWeight: 0,
    strokeColor: 'blue',
    fillColor: provinceBaidu.fillColor,
    fillOpacity: 0.3,
    strokeOpacity: 0.2
  })
  province.getBoundary()
  if (province.name !== '北京' && province.name !== '天津')
    province.addName()
}

for (var i = 0; i < cityData.length; i++) {
  var cityStr = cityData[i]
  var city = new City(cityStr)
  city.addMarker()
}


