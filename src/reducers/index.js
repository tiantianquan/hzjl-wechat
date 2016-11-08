import {
  actionType
} from '../actions'

const initialState = {
  articleList: {}
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionType.GET_ARTICLE_LIST_LOADING:
      console.log('loading')
      return state
    case actionType.GET_ARTICLE_LIST_END:
      return {
        articleList:action.data,
      }
    default:
      return state;
  }
}

const rootReducer = reducer

export default rootReducer