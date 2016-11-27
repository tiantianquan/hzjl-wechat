import axios from 'axios'

import {
  timeout
} from '../util'

import egData from './egData'


class Api {
  static url = '/getDefaultData'
  static urlPrex = 'http://www.reegle.cn/news/GetNewsByCategory?category='

  static async getAllData() {
    await timeout(1000)
    return egData
  }

  static async getNewsByCategory(category) {
    var res = await axios.get(this.urlPrex + category)
    res.data.forEach(i => {
      i.update_time = new Date(i.update_time)
      i.thumbl_url = '/Lighthouse.jpg'
    })

    return res.data
  }
}


export default Api