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