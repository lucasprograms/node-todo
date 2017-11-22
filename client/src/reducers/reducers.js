import { combineReducers } from 'redux'
import cards from './cards'
import lists from './lists'

const cardApp = combineReducers({
  cards,
  lists
})

export default cardApp
