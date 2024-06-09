import { combineReducers } from 'redux';
import timer from './timer';
import user from './user';

export default combineReducers({
  timer,
  user
})