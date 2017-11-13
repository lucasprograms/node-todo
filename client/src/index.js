import React from 'react' // eslint-disable-line
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux' // eslint-disable-line
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { fetchTodos, addTodoSuccess } from './actions'
import todoApp from './reducers/reducers'
import App from './components/presenters/App' // eslint-disable-line
import registerServiceWorker from './registerServiceWorker'
import socket from './sockets'

const loggerMiddleware = createLogger()

let store = createStore(
  todoApp,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

store.dispatch(fetchTodos())
socket.on('todo added remotely', (todo) => {
  store.dispatch(addTodoSuccess(todo))
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
