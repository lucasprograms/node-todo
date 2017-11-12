import React from 'react' // eslint-disable-line
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux' // eslint-disable-line
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { fetchTodos, socket } from './actions'
import todoApp from './reducers/reducers'
import App from './components/presenters/App' // eslint-disable-line
import registerServiceWorker from './registerServiceWorker'

const loggerMiddleware = createLogger()

let store = createStore(
  todoApp,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)

socket.on('new todo', () => {
  store.dispatch(fetchTodos())
})

store
.dispatch(fetchTodos())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
