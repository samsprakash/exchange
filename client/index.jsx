'use strict';

require('./shared-style/base.pcss');


import React from 'react';
import { render } from 'react-dom';


import LoginPage from './components/LoginPage';
import Root from './components/Root';
import Reducer from './reducers/reducer';
import defaultState from './state';

import { Provider } from 'react-redux';
import { Router, Route, Redirect, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(
  combineReducers(Object.assign({ app: Reducer }, { routing: routerReducer })),
  defaultState,
  applyMiddleware(routerMiddleware(hashHistory), thunk)
);

const history = syncHistoryWithStore(hashHistory, store);

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <Router history={history}>
        <Route component={Root}>
          <Redirect from="/" to="/login" />
          <Route path="login" component={LoginPage} />
          <Redirect from="*" to="/login" />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
  );
});
