import axios from 'axios'

import {
  timeout
} from '../util'

import egData from './egData'


class Api {
  static url = '/getDefaultData'

  static async getAllData() {
    await timeout(5000)
    return egData
  }
}


export default Api