function initBar() {
  $('.back-btn').text('地图')
  changeBarText('五省二市')
}


/**
 * 返回按钮绑定事件
 */
function back() {
  if (!preState.Province)
    return
  changePage(function () {
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
    }, 200)
  }, 200)
}


function clearOverlay() {
  City.clearMarker()
  Province.clearOverlay()
}


