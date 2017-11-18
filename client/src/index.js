import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { fetchCards, addCardSuccess } from './actions'
import cardApp from './reducers/reducers'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import socket from './sockets'

const loggerMiddleware = createLogger()

const store = createStore(
  cardApp,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

store.dispatch(fetchCards())
socket.on('card added remotely', (card) => {
  store.dispatch(addCardSuccess(card))
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
