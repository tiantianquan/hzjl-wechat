import axios from 'axios'

import { timeout } from '../util'

import egData from './egdata'

//TODO:添加错误处理
/**
 * API 封装
 */
class Api {
  static url = '/getDefaultData'

  static async getAllData() {
    await timeout(1000)
    return egData
  }
}


export default Api