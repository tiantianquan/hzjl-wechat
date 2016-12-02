import axios from 'axios'

import {
  timeout
} from '../util'

import egData from './egData'


class Api {
  // static url = '/getDefaultData'
  // static urlPrex = 'http://localhost:9999/'
  // static urlPrex = 'http://www.reegle.cn/'
   static urlPrex = '/'

  static async getAllData() {
    await timeout(1000)
    return egData
  }

  static async getNewsByCategory(category) {
    var url='api/news/GetNewsByCategory?category='
    var res = await axios.get(this.urlPrex +url+ category)
    res.data.forEach(i => {
      i.update_time = new Date(i.update_time)
      // if(i.thumb_url[0] !== '/')
      // i.thumb_url = '/image/Lighthouse.jpg'
    })

    return res.data
  }


  static async getSearchByCategory(searchText) {
    var url = 'api/news/GetNewsBySearchText?searchtext='
    var res = await axios.get(this.urlPrex +url+ searchText)
    res.data.forEach(i => {
      i.update_time = new Date(i.update_time)
    })

    return res.data
  }
}


export default Api