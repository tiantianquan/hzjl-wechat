import axios from 'axios'

class Api {
  // static url = '/getDefaultData'
  // static urlPrex = 'http://localhost:9999/'
  // static urlPrex = 'http://www.reegle.cn/'
    // static urlPrex = 'http://wx.jjhz-tj.gov.cn/'
   static urlPrex = '/'



  static async getNewsByCategory(category) {
    var url='api/MobileNews/GetNewsByCategory?category='
    var res = await axios.get(this.urlPrex +url+ category)
    res.data.forEach(i => {
      i.update_time = new Date(i.update_time)
      // if(i.thumb_url[0] !== '/')
      // i.thumb_url = '/image/Lighthouse.jpg'
    })

    return res.data
  }


  static async getSearchByCategory(searchText,tag) {
    var url = `${this.urlPrex}api/MobileNews/GetNewsBySearchText?searchtext=${searchText}&searchtag=${tag}`
    var res = await axios.get(url)
    res.data.forEach(i => {
      i.update_time = new Date(i.update_time)
    })
    return res.data
  }
}


export default Api