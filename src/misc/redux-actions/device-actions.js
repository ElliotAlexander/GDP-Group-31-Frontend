import { deviceConstants } from '../constants/device-constants';

// TODO reducers couldd probably be combined into one general larger obj for these simple values.
export function setDevice(device) {
  return {
    type: deviceConstants.SET,
    device,
  };
}

export function clearDevice() {
  return {
    type: deviceConstants.CLEAR,
  };
}

export function getDevice() {
  return {
    type: deviceConstants.GET,
  };
}
