import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
// import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'

import MainView from './containers/mainView.jsx'
import rootReducer from './reducers'

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
let store = createStoreWithMiddleware(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const App = React.createClass({
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    )
  }
})

const mountNode = document.querySelector("#app")
ReactDOM.render(<App />, mountNode)