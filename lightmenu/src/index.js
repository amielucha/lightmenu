import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import {
  ConnectedRouter,
  push
} from 'react-router-redux';

import App from './App';
import Submenu from './components/Submenu';

// Redux imports
import { Provider } from 'react-redux';
import { store, history } from './redux';

// Styles
import './index.css';

// Now you can dispatch navigation actions from anywhere!

window.push = push;
//store.dispatch(push('/foo'))

const router = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={App} />
    </ConnectedRouter>
  </Provider>
);

render(router, document.getElementById('lightmenu'));
