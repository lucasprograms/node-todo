import { ADD_TODO_REQUESTED, REMOVE_TODO, TOGGLE_TODO } from '../constants/actionTypes'
const defaultState = {
  isUpdating: false
}

const todos = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TODO_REQUESTED:
      return { ...state, isUpdating: true }
    case ADD_TODO_SUCCESS:
      return { ...state, isUpdating: false }
    default:
      return state
  }
}

// case TOGGLE_TODO:
// return (
//   state.map((todo) => {
//     if (todo.id === action.id) {
//       return {
//         ...todo, isCompleted: !todo.isCompleted
//       }
//     }

//     return todo
//   })
// )
// case REMOVE_TODO:
// return state.filter(todo => todo.id !== action.id)
// default:
// return state