import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import HbhProjectView from './containers/hbhProjectView.jsx'
import HbhCityView from './containers/hbhCityView.jsx'
import HzjlView1 from './containers/hzjlView1.jsx'
import HzjlView2 from './containers/hzjlView2.jsx'
import HzjlView3 from './containers/hzjlView3.jsx'
import rootReducer from './reducers'

import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'


//react-router-redux
const reducer = combineReducers({
  rootReducer,
  routing: routerReducer
})



let createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
let store = createStoreWithMiddleware(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const history = syncHistoryWithStore(browserHistory, store)

const routeConfig = [
  {
    path: '/hbhProject',
    component: HbhProjectView,
    indexRoute: { component: HbhProjectView },
    childRoutes: [
      {
        path: 'category/:categoryName',
        component: HbhProjectView
      },
    ],
    onEnter: function () {
      document.title =  '环渤海区域合作'
    }
  }, {
    path: '/hbhCity',
    component: HbhCityView,
    indexRoute: { component: HbhCityView },
    childRoutes: [
      {
        path: 'category/:categoryName',
        component: HbhCityView
      }
    ],
    onEnter: function () {
      document.title =  '环渤海区域合作'
    }
  },
  {
    path: '/hzjl1',
    component: HzjlView1,
    indexRoute: { component: HzjlView1 },
    childRoutes: [
      {
        path: 'category/:categoryName',
        component: HzjlView1
      }
    ],
    onEnter: function () {
      document.title =  '天津市合作交流'
    }
  },
  {
    path: '/hzjl2',
    component: HzjlView2,
    indexRoute: { component: HzjlView2 },
    childRoutes: [
      {
        path: 'category/:categoryName',
        component: HzjlView2
      }
    ],
    onEnter: function () {
      document.title =  '天津市合作交流'
    }
  },
  {
    path: '/hzjl3',
    component: HzjlView3,
    indexRoute: { component: HzjlView3 },
    childRoutes: [
      {
        path: 'category/:categoryName',
        component: HzjlView3
      }
    ],
    onEnter: function () {
      document.title =  '天津市合作交流'
    }
  }
]




const App = React.createClass({
  render() {
    return (
      <Provider store={store}>
        <Router routes={routeConfig} history={history}>
        </Router>
      </Provider>
    )
  }
})


const mountNode = document.querySelector("#app")
ReactDOM.render(<App />, mountNode)