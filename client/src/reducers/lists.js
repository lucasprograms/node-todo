import {
  REQUEST_LISTS,
  RECEIVE_LISTS,
  ADD_LIST_SUCCESS,
  ADD_LIST_REQUESTED
} from '../constants/actionTypes'

const defaultState = {
  isFetching: false,
  isAdding: false,
  isToggling: false,
  isUpdating: false,
  isDeleting: false,
  items: []
}

const lists = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_LIST_REQUESTED:
      return { ...state, isAdding: true }
    case ADD_LIST_SUCCESS:
      return { ...state, isAdding: false, items: [...state.items, action.newList] }
    case REQUEST_LISTS:
      return { ...state, isFetching: true }
    case RECEIVE_LISTS:
      return { ...state, isFetching: false, items: action.lists }
    default:
      return state
  }
}

export default lists
