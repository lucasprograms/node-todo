import React from 'react' // eslint-disable-line
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux' // eslint-disable-line
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { fetchTodos, addTodoSuccess } from './actions'
import { clientSocketSetup } from './sockets'
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

clientSocketSetup(
  (todo) => { store.dispatch(addTodoSuccess(todo)) }
)

store.dispatch(fetchTodos())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
