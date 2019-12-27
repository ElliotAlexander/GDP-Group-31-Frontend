import { uuidConstants } from '../constants/uuid-constants';

export function setUUID(uuid) {
  return {
    type: uuidConstants.SET,
    uuid,
  };
}

export function clearUUID() {
  return {
    type: uuidConstants.CLEAR,
  };
}

export function getUUID() {
  return {
    type: uuidConstants.GET,
  };
}
