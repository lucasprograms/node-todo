import {
  ADD_CARD,
  ADD_CARD_SUCCESS,
  ADD_CARD_REQUESTED,
  DELETE_CARD_REQUESTED,
  DELETE_CARD_SUCCESS,
  REQUEST_CARDS,
  RECEIVE_CARDS,
  REMOVE_CARD,
  SET_VISIBILITY_FILTER,
  TOGGLE_CARD,
  UPDATE_CARD_REQUESTED,
  UPDATE_CARD_SUCCESS,
  UPDATE_ORDINAL_VALUE_BY_ID
} from './constants/actionTypes';

import socket from './sockets';

export const removeCard = id => ({
  type: REMOVE_CARD,
  id,
});

export const toggleCard = id => ({
  type: TOGGLE_CARD,
  id,
});

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter,
});

export const requestCards = () => ({
  type: REQUEST_CARDS,
});

export const receiveCards = cards => ({
  type: RECEIVE_CARDS,
  cards,
});

export const fetchCards = () => function (dispatch) {
  dispatch(requestCards());

  fetch('/cards')
    .then(res => res.json())
    .then((json) => {
      dispatch(receiveCards(json));
    });
};

export const requestAddCard = () => ({
  type: ADD_CARD_REQUESTED,
});

export const addCardSuccess = newCard => ({
  type: ADD_CARD_SUCCESS,
  newCard,
});

export const requestUpdateCard = () => ({
  type: UPDATE_CARD_REQUESTED
})

export const updateCardSuccess = (updatedCard) => ({
  type: UPDATE_CARD_SUCCESS,
  updatedCard
})

export const requestDeleteCard = () => ({
  type: DELETE_CARD_REQUESTED
})

export const deleteCardSuccess = (id) => ({
  type: DELETE_CARD_SUCCESS,
  id
})

export const updateCard = (id, update) => {
  return function (dispatch) {
    dispatch(requestUpdateCard())
    fetch('/card', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ id, toUpdate: update })
    })
    .then(res => res.json())
    .then((json) => {
      dispatch(updateCardSuccess(json.value));
      return json[0];
    })
  }
}

export const deleteCard = (id) => {
  return function (dispatch) {
    dispatch(requestDeleteCard())
    fetch('/card', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ id })
    })
    .then(() => {
      dispatch(deleteCardSuccess(id));
    })
  }
}

export const addCard = (cardText, nextOrdinalValue) => {
  const emitCardAddedEvent = (card) => {
    socket.emit('card added remotely', card);
  };

  return function (dispatch) {
    dispatch(requestAddCard());

    const dateAdded = new Date();
    const newCard = { text: cardText, isCompleted: false, date: dateAdded, ordinalValue: nextOrdinalValue };

    fetch('/cards', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(newCard),
    })
      .then(res => res.json())
      .then((json) => {
        dispatch(addCardSuccess(json[0]));
        return json[0];
      })
      .then((card) => {
        emitCardAddedEvent(card);
      });
  };
};
