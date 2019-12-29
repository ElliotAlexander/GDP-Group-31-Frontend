import { deviceConstants } from '../constants/device-constants';

const initialState = {
  device: 'not set',
};

export function device(state = initialState, action) {
  if (action.type === deviceConstants.SET) {
    return {
      device: action.device,
    };
  }
  if (action.type === deviceConstants.CLEAR) {
    return {
      device: {},
    };
  }
  if (action.type === deviceConstants.GET) {
    return {
      device: state.device,
    };
  }
  return {};
}
