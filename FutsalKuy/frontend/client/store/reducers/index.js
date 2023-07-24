import { combineReducers } from 'redux';
import mainReducer from './mainReducer'
import userReducer from './userReducer';
export default combineReducers({
  mainReducer, userReducer
});