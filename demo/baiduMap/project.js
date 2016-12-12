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
    Project.showRowItem('区域政策')
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