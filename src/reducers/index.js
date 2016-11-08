import {
  actionType
} from '../actions'

const initialState = {
  articleList: {},
  isLoading: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionType.GET_ARTICLE_LIST_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case actionType.GET_ARTICLE_LIST_END:
      return {
        articleList: action.data,
        isLoading: action.isLoading
      }
    default:
      return state;
  }
}

const rootReducer = reducer

export default rootReducer