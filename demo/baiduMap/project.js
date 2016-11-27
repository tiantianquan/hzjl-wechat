/**
 * 
digest: "拟建设温泉酒店、商业中心、商住、公寓、住宅、影院等。"
show_cover_pic: "0"
thumb_media_id : "X1yhfcSZLEY18SUx0nazubFp3QP64Wh8GKTY_qeCfYY"
thumb_url : "http://mmbiz.qpic.cn/mmbiz_jpg/C8o4ricSxBiao8DKnpwBwdV7m8SLJOqrlw5Y4RTbictFyL9MP6HvESKgoTrCgiaESWsoubN2F1buogM1wvTMibdxPPw/0?wx_fmt=jpeg"
title : "【葫芦岛】兴城滨海温泉新城商业综合体项目"
url : "http://mp.weixin.qq.com/s?
 */

// var url = 'http://localhost:19581/media/GetNewsbycity?cityName='
var url = 'http://www.reegle.cn/api/news/GetNewsByCategory?category='
// var url = 'http://localhost:9999/News/GetNewsByCategory?cityName='

var formatData = function (res) {
  res = JSON.parse(res)
  var data = []
  res.forEach(function (d) {
    console.log(d.update_time)
    item = d
    data.push({
      url: item.url,
      title: item.title,
      digest: item.digest,
      thumb_url: item.thumb_url,
      update_time:new Date(item.update_time)
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

Project.getAll = function (cityName, cb) {
  $.get(url + cityName, function (res) {
    cb(formatData(res))
  })
}

Project.ctrlDom = function (data) {
  // var prexUrl = 'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl='
  // prexUrl=''
  var imageUrl = './Lighthouse.jpg'

  function replTempl(item) {
    var templ =
      `  
    <a href=${item.url} class="main-list-item" >
    <div style="display: -webkit-box; display: flex">
      <img style="
        margin-right: 10px;
        display: block;
        max-width: 80px;
        min-width: 80px;
        height: 60px;
      " src=${imageUrl} />
      <div style="display: inline-block; overflow: hidden ">
        <h2 class="title">${item.title}</h2>
        <p class="desc" style="margin: 5px 0 5px 0">${item.update_time.getFullYear()+'年'+
     (item.update_time.getMonth()+1)+'月'+item.update_time.getDate()+'日'}</p>
        <p class="desc">${item.digest}</p>
      </div>
    </div>
  </a>`

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