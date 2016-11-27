import actionType from './atcionType'
import Api from '../api'


function getArticleListStart(category) {
  return async function (dispatch) {
    dispatch(getArticleListLoading())
    let data = await Api.getNewsByCategory(category)
    dispatch(getArticleListEnd(data))
  }
}

function getArticleListLoading() {
  return {
    type: actionType.GET_ARTICLE_LIST_LOADING,
    isLoading:true
  }
}

function getArticleListEnd(data) {
  return {
    type: actionType.GET_ARTICLE_LIST_END,
    data,
    isLoading:false
  }
}
export default {
  getArticleListStart,
  getArticleListLoading,
  getArticleListEnd
}

export {actionType}