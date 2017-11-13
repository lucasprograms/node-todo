import {
  ADD_TODO,
  ADD_TODO_SUCCESS,
  ADD_TODO_REQUESTED,
  REQUEST_TODOS,
  RECEIVE_TODOS,
  REMOVE_TODO,
  SET_VISIBILITY_FILTER,
  TOGGLE_TODO
} from './constants/actionTypes'
import socket from './sockets'

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  id
})

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id
})

export const setVisibilityFilter = (filter) => ({
  type: SET_VISIBILITY_FILTER,
  filter
})

export const requestTodos = () => ({
  type: REQUEST_TODOS
})

export const receiveTodos = (todos) => ({
  type: RECEIVE_TODOS,
  todos
})

export const fetchTodos = () => {
  return function (dispatch) {
    dispatch(requestTodos())

    fetch('/todos')
    .then(res => res.json())
    .then(json => {
      dispatch(receiveTodos(json))
    })
  }
}

export const requestAddTodo = () => ({
  type: ADD_TODO_REQUESTED
})

export const addTodoSuccess = (newTodo) => ({
  type: ADD_TODO_SUCCESS,
  newTodo
})

export const addTodo = (todoText) => {
  const emitTodoAddedEvent = (todo) => {
    socket.emit('todo added remotely', todo)
  }

  return function(dispatch) {
    dispatch(requestAddTodo())

    const dateAdded = new Date()
    const newTodo = { text: todoText, isCompleted: false, date: dateAdded }

    fetch('/todos', {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(newTodo)
    })
      .then(res => res.json())
      .then((json) => {
        dispatch(addTodoSuccess(json[0]))
        return json[0]
      })
      .then((todo) => {
        emitTodoAddedEvent(todo)
      })
  }
}
