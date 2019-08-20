require('./style/Form.pcss');

import React from 'react';
import { connect } from 'react-redux';
import LoginAction from '../actions/Login';
import DropDown from './DropDown';
import { EXCHANGE_DISPATCH } from '../constants/login';
import { FORM_KEYS, FORM_TYPES } from '../constants/forms';


const LoginPage = connect(

  state => ({
    form: state.app[FORM_TYPES.EXCHANGE]
  }),

  dispatch => ({
    [EXCHANGE_DISPATCH.CURRENCY_CHANGED]: (key) => e => {
      dispatch({
        type: 'CHANGE_BASE_CURRENCY_DETAILS',
        key: key,
        value: e
      });
    },
    [EXCHANGE_DISPATCH.SUBMIT]: (baseCurrency, exchangeCurrency) => e => {
      dispatch(LoginAction(baseCurrency.text, exchangeCurrency.text));
      e.preventDefault();
    }
  })

)(state => {
  let form = state.form;
  

  return (
      <div className="form-dialog">
        <div className="body">
          <form onSubmit={state[EXCHANGE_DISPATCH.SUBMIT](
            form['baseCurrency'],
            form['exchangeCurrency'])}>
            <div>
            <DropDown 
                items={form['defaultCurrency']}
                selectedItem = {form['baseCurrency']}
                onChange = {state[EXCHANGE_DISPATCH.CURRENCY_CHANGED]('baseCurrency')} 
              />
            <DropDown 
                items={form['defaultCurrency']}
                selectedItem = {form['exchangeCurrency']}
                onChange = {state[EXCHANGE_DISPATCH.CURRENCY_CHANGED]('exchangeCurrency')} 
              />
            </div>

            <button type="submit" disabled={form[FORM_KEYS.PROCESSING] || undefined}
              key="login-submit"
              className="auth-button">
              {form[FORM_KEYS.PROCESSING] ? (
                <div>
                  <div className="spinner"></div>
                  <span>{form[FORM_KEYS.PROCESSING_MESSAGE]}</span>
                </div>
              ) : (
                <span>{'submit'}</span>
              )}
            </button>
          </form>

          <div>
            {form['exchangeRate']   ? (
              <div className ='form-heading'> Exchange Rate: {form['exchangeRate']} </div>
            ) : '' }  

          </div>
        </div>
      </div>
 
  );
});
export default LoginPage;
