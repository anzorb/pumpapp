import React from 'react'
import ReactDOM from 'react-dom'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import App from './containers/App'
import reducers from './reducers/'
import './index.scss'
import './common.scss'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const store = createStore(reducers, applyMiddleware(ReduxThunk))

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'))
