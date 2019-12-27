import { uuidConstants } from '../constants/uuid-constants';

const initialState = {
  uuid: '',
};

export function uuidReducer(state = initialState, action) {
  if (action.type === uuidConstants.SET) {
    return {
      uuid: action.uuid,
    };
  }
  if (action.type === uuidConstants.CLEAR) {
    return {
      uuid: {},
    };
  }
  if (action.type === uuidConstants.GET) {
    return {
      uuid: state.uuid,
    };
  }
  return {};
}
