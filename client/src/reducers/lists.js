import {
  REQUEST_LISTS,
  RECEIVE_LISTS
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
    case REQUEST_LISTS:
      return { ...state, isFetching: true }
    case RECEIVE_LISTS:
      return { ...state, isFetching: false, items: action.lists }
    default:
      return state
  }
}

export default lists
