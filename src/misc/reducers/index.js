import { combineReducers } from 'redux';
import { authentication } from './authentication-reducer';
import { alert } from './alert-reducer';
import { device } from './device-reducer';

const rootReducer = combineReducers({
  authentication,
  alert,
  device,
});

export default rootReducer;
