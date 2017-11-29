import {
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
  REQUEST_LISTS,
  RECEIVE_LISTS,
  ADD_LIST_REQUESTED,
  ADD_LIST_SUCCESS
} from './constants/actionTypes'

import socket from './sockets'

export const removeCard = id => ({
  type: REMOVE_CARD,
  id
})

export const toggleCard = id => ({
  type: TOGGLE_CARD,
  id
})

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter
})

export const requestCards = () => ({
  type: REQUEST_CARDS
})

export const receiveCards = cards => ({
  type: RECEIVE_CARDS,
  cards
})

export const requestLists = () => ({
  type: REQUEST_LISTS
})

export const receiveLists = lists => ({
  type: RECEIVE_LISTS,
  lists
})

export const requestAddList = () => ({
  type: ADD_LIST_REQUESTED
})

export const addListSuccess = newList => ({
  type: ADD_LIST_SUCCESS,
  newList
})

export const fetchLists = () => function (dispatch) {
  dispatch(requestLists())

  fetch('/lists')
    .then(res => res.json())
    .then((lists) => {
      lists.forEach(list => {
        dispatch(fetchCards(list._id))
      })
      dispatch(receiveLists(lists))
    })
}

export const fetchCards = (listId) => function (dispatch) {
  dispatch(requestCards())

  fetch('/cards?listId=' + listId)
    .then(res => res.json())
    .then((json) => {
      dispatch(receiveCards(json))
    })
}

export const requestAddCard = () => ({
  type: ADD_CARD_REQUESTED
})

export const addCardSuccess = newCard => ({
  type: ADD_CARD_SUCCESS,
  newCard
})

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

export const swapOrdinalValues = (ids) => ({
  type: 'SWAP_ORDINAL_VALUES',
  ids
})

export const updateCard = (id, update) => {
  return function (dispatch) {
    dispatch(requestUpdateCard())
    fetch('/card', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({ id, toUpdate: update })
    })
      .then(res => res.json())
      .then((json) => {
        dispatch(updateCardSuccess(json.value))
        return json[0]
      })
  }
}

export const deleteCard = (id) => {
  return function (dispatch) {
    dispatch(requestDeleteCard())
    fetch('/card', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({ id })
    })
      .then(() => {
        dispatch(deleteCardSuccess(id))
      })
  }
}

export const addCard = ({ text, listId }) => {
  const emitCardAddedEvent = (card) => {
    socket.emit('card added remotely', card)
  }

  return function (dispatch) {
    dispatch(requestAddCard())

    const dateAdded = new Date()
    const newCard = { text, listId, isCompleted: false, date: dateAdded, ordinalValue: 2 }

    fetch('/cards', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(newCard)
    })
      .then(res => res.json())
      .then((card) => {
        dispatch(addCardSuccess(card))
        return card
      })
      .then((card) => {
        emitCardAddedEvent(card)
      })
  }
}

export const addList = ({ text, boardId }) => {
  const emitListAddedEvent = (list) => {
    socket.emit('list added remotely', list)
  }

  return function (dispatch) {
    dispatch(requestAddList())

    const dateAdded = new Date()
    const newList = { title: text, boardId, date: dateAdded, cards: [] }

    fetch('/lists', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(newList)
    })
      .then(res => res.json())
      .then((list) => {
        dispatch(addListSuccess(list))
        return list
      })
      .then((list) => {
        emitListAddedEvent(list)
      })
  }
}
