import reqwest from 'reqwest';

import { LOGIN_BEGIN, LOGIN_SUCCESS, LOGIN_ERROR } from '../constants/action-types';

const LoginAction = (baseCurrency, exchangeCurrency ) => dispatch => {
  dispatch({
    type: LOGIN_BEGIN
  });

  reqwest({
    url: 'exchangeRates?baseCurrency='+baseCurrency+'&exchangeCurrency='+exchangeCurrency,
    method: 'GET'
  }).then(response => {
    dispatch({
      type: LOGIN_SUCCESS,
      value: response
    });

  }).catch(err => {

    dispatch({
      type: LOGIN_ERROR,
      value: JSON.parse(err.responseText).message
    });

  });
};

export default LoginAction;
