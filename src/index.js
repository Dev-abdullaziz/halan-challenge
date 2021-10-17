import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import App from './App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import { BrowserRouter as Router }  from 'react-router-dom'

const store = createStore(reducers)

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
  ,
  document.getElementById('root')
)
