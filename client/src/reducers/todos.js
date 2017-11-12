import { ADD_TODO_REQUESTED, ADD_TODO_SUCCESS, REQUEST_TODOS, RECEIVE_TODOS, TOGGLE_TODO_REQUESTED, TOGGLE_TODO_SUCCESS } from '../constants/actionTypes'
const defaultState = {
  isFetching: false,
  isAdding: false,
  isToggling: false,
  todos: []
}

const todos = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TODO_REQUESTED:
      return { ...state, isAdding: true }
    case ADD_TODO_SUCCESS:
      return { ...state, isAdding: false, todos: [ ...state.todos, action.newTodo ]}
    case REQUEST_TODOS:
      return { ...state, isFetching: true }
    case RECEIVE_TODOS:
      return { ...state, isFetching: false, todos: action.todos }
    case TOGGLE_TODO_REQUESTED:
      return { ...state, isToggling: true }
    case TOGGLE_TODO_SUCCESS:
      return { ...state, isToggling: false }
    default:
      return state
  }
}

export default todos
