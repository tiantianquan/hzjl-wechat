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
  if(this.name.length>=4){
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
    setTimeout(function () {
      Project.removeDom()
      Project.showList()
      Project.showLoading()
      Project.getAll(that.name, function (d) {
        Project.ctrlDom(d)
        Project.hideLoading()
      })

    }, 300)

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