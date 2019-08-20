import LoginReducer from './reducer-login';
import { FORM_TYPES } from '../constants/forms';

import * as ACTIONS from '../constants/action-types';

const Reducer = (state = {}, action) => {
  let newState = Object.assign({}, state);
  
  switch(action.type) {
    case ACTIONS.CHANGE_LOGIN_DETAILS:
    case ACTIONS.LOGIN_BEGIN:
    case ACTIONS.LOGIN_ERROR:
    case ACTIONS.LOGIN_SUCCESS:
    case 'CHANGE_BASE_CURRENCY_DETAILS':
      newState[FORM_TYPES.EXCHANGE] =
        LoginReducer(newState[FORM_TYPES.EXCHANGE], action);
    break;
  }

  return newState;
};

export default Reducer;
