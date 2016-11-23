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
    map.removeOverlay(p)
  })
  map.removeOverlay(this.nameLabel)
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
      map.addOverlay(ply)
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