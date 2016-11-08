import actionType from './atcionType'
import Api from '../api'

function getArticleListStart(page, per_page) {
  return async function (dispatch) {
    dispatch(getArticleListLoading())
    let data = await Api.getAllData(page, per_page)
    dispatch(getArticleListEnd(data))
  }
}

function getArticleListLoading() {
  return {
    type: actionType.GET_ARTICLE_LIST_LOADING,
  }
}

function getArticleListEnd(data) {
  return {
    type: actionType.GET_ARTICLE_LIST_END,
    data
  }
}
export default {
  getArticleListStart,
  getArticleListLoading,
  getArticleListEnd
}

export {actionType}