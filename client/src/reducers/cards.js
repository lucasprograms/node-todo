import { UPDATE_ORDINAL_VALUE_BY_ID, UPDATE_CARD_REQUESTED, UPDATE_CARD_SUCCESS, ADD_CARD_REQUESTED, ADD_CARD_SUCCESS, REQUEST_CARDS, RECEIVE_CARDS, TOGGLE_CARD_REQUESTED, TOGGLE_CARD_SUCCESS } from '../constants/actionTypes';

const defaultState = {
  isFetching: false,
  isAdding: false,
  isToggling: false,
  isUpdating: false,
  items: [],
};

const cards = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_ORDINAL_VALUE_BY_ID:
      const item = state.items.filter(item => item._id === action.id)
      const filteredItems2 = state.items.filter(item => item._id !== action.id)
      return ({
        ...state,
        isUpdating: false,
        items: [ ...filteredItems2, { ...item, ordinalValue: action.ordinalValue } ]
      })
    case ADD_CARD_REQUESTED:
      return { ...state, isAdding: true };
    case ADD_CARD_SUCCESS:
      return { ...state, isAdding: false, items: [...state.items, action.newCard] };
    case UPDATE_CARD_REQUESTED:
      return { ...state, isUpdating: true };
    case UPDATE_CARD_SUCCESS:
      const filteredItems = state.items.filter(item => item._id !== action.updatedCard._id)
      return { ...state, isUpdating: false, items: [...filteredItems, action.updatedCard] }
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
