import {
  CHANGE_LOGIN_DETAILS,
  LOGIN_BEGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS
} from '../constants/action-types';

import { FORM_KEYS } from '../constants/forms';

const LoginReducer = (state, action) => {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case CHANGE_LOGIN_DETAILS:
      newState[action.key] = action.value;
    break;
    case 'CHANGE_BASE_CURRENCY_DETAILS':
      newState[action.key] = action.value;
    break;
    case LOGIN_BEGIN:
      newState[FORM_KEYS.PROCESSING_MESSAGE] = 'Calculating...';
      newState[FORM_KEYS.PROCESSING] = true;
      newState[FORM_KEYS.ERROR] = false;
    break;
    case LOGIN_ERROR:
      newState[FORM_KEYS.PROCESSING] = false;
      newState[FORM_KEYS.ERROR] = true;
      newState[FORM_KEYS.ERROR_MESSAGE] = action.value;
    break;
    case LOGIN_SUCCESS:
      newState[FORM_KEYS.PROCESSING] = false;
      newState[FORM_KEYS.PROCESSING_MESSAGE] = '';
      newState['exchangeRate'] = action.value;
    break;
  }

  return newState;
};

export default LoginReducer;
