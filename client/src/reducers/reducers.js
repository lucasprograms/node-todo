import { combineReducers } from 'redux';
import cards from './cards';

const cardApp = combineReducers({
  cards
});

export default cardApp;
