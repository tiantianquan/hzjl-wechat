import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import MainView from './containers/mainView.jsx'
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
    path: '/',
    component: MainView,
    indexRoute: { component: MainView },
    childRoutes: [
      {
        path: 'category/:categoryName',
        component: MainView
      },
    ]
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