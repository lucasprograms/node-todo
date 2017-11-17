import {
  UPDATE_ORDINAL_VALUE_BY_ID,
  DELETE_CARD_REQUESTED,
  DELETE_CARD_SUCCESS,
  UPDATE_CARD_REQUESTED,
  UPDATE_CARD_SUCCESS,
  ADD_CARD_REQUESTED,
  ADD_CARD_SUCCESS,
  REQUEST_CARDS,
  RECEIVE_CARDS,
  TOGGLE_CARD_REQUESTED,
  TOGGLE_CARD_SUCCESS
} from '../constants/actionTypes';

const defaultState = {
  isFetching: false,
  isAdding: false,
  isToggling: false,
  isUpdating: false,
  isDeleting: false,
  items: [],
};

const cards = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_CARD_REQUESTED:
      return { ...state, isAdding: true };
    case ADD_CARD_SUCCESS:
      return { ...state, isAdding: false, items: [...state.items, action.newCard] };
    case DELETE_CARD_REQUESTED:
      return { ...state, isDeleting: true };
    case DELETE_CARD_SUCCESS:
      const remainingItems = state.items.filter(item => item._id !== action.id)
      return { ...state, isDeleting: false, items: remainingItems };
    case UPDATE_CARD_REQUESTED:
      return { ...state, isUpdating: true };
    case UPDATE_CARD_SUCCESS:
      return { ...state, isUpdating: false, items: [...state.items, action.updatedCard] }
    case REQUEST_CARDS:
      return { ...state, isFetching: true };
    case RECEIVE_CARDS:
      return { ...state, isFetching: false, items: action.cards };
    case TOGGLE_CARD_REQUESTED:
      return { ...state, isToggling: true };
    case TOGGLE_CARD_SUCCESS:
      return { ...state, isToggling: false };
    default:
      return state;
  }
};

export default cards;
