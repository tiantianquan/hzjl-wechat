var all = require('./$mapPonit.js')

var str = `天津市、大连市、沈阳市、丹东市、营口市、锦州市、盘锦市、葫芦岛市、阜新市、朝阳市、石家庄市、秦皇岛市、保定市、唐山市、沧州市、承德市、邢台市、邯郸市、廊坊市、衡水市、青岛市、济南市、滨州市、德州市、东营市、潍坊市、烟台市、威海市、淄博市、聊城市、日照市、枣庄市、太原市、长治市、忻州市、大同市、晋城市、阳泉市、呼和浩特市、通辽市、包头市、呼伦贝尔市、满洲里市、鄂尔多斯市、赤峰市、乌兰察布市、锡林郭勒盟、巴彦淖尔市、安阳市、濮阳市`

var list = str.split('、')

list = list.map((c)=>{
  return c.replace('市','')
})

var resCitys = []

list.forEach((c)=>{
  var flag = false
  all.provinces.forEach(p=>{
    p.cities.forEach(cc=>{
      if(cc.n == c){
        resCitys.push(cc)
        flag = true
      }
    })
  })

  if(!flag){
    console.log(c)
  }
})

console.log(resCitys)
