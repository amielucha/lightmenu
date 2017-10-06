import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push
} from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';

// history.js
export const history = createHistory();

export const middleware = routerMiddleware(history);

// reducers.js
export const submenu = (state = {}, action) => {
  switch (action.type) {
    case 'ACTIVATE_SUBMENU':
      return action.submenu;
    case 'CLOSE_SUBMENU':
      return state;
    default:
      return state;
  }
};

export const menuToggle = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_MENU':
      return true;
    case 'HIDE_MENU':
      return false;
  }

  return state;
};


// reducers.js
export const reducers = combineReducers({
  submenu,
  menuToggle,
  router: routerReducer,
});


// store.js
export function configureStore(initialState = {}) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(middleware))
  )

  // expose store
  window.store = store;

  return store;
};

export const store = configureStore();
