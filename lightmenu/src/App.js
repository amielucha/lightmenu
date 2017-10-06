/*global siteInfo */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'

import { store } from './redux';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import { CSSTransitionGroup } from 'react-transition-group';

import './App.css';

import * as actionCreators from './actions/actionCreators'
import MenuItems from './components/MenuItems';
import Submenu from './components/Submenu';

class App extends Component {
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: []
    }
    this.apiUrl = siteInfo.site_url + '/index.php/wp-json/wp-api-menus/v2/menu-locations/primary'
  }

  componentDidMount(){
    axios.get(this.apiUrl)
      .then((res) => {
        // Set state with result
        this.setState({data:res.data});

        //console.log('hello', siteInfo);
      })
      .catch(function (error) {
        console.error('Menu could not be fetched. Make sure you provided the correct Rest API URL, the server is up and running, and there is a primary menu assigned.\n', error);
      });
  }

  render() {
    //console.log('Store value:', store.getState().menuToggle)

    return (
      <div
        className={store.getState().menuToggle ? 'lightmenu-container active': 'lightmenu-container'}
        onClick={(e) => {
          //console.log('click on: ', e.target, document.querySelector('.lightmenu-container'));
          if (e.target === document.querySelector('.lightmenu-container')){
            store.dispatch({type: 'HIDE_MENU'});
          }
        }}
      >
        <div className="light-menus">
          <nav className="light-menu">
            <MenuItems data={this.state.data} />
          </nav>
          <CSSTransitionGroup
              transitionName="slideIn"
              transitionEnterTimeout={150}
              transitionLeaveTimeout={150}
            >
            <Route
              location={this.props.location}
              key={this.props.location.key}
              path="/sub/:id"
              render={({ match, props }) => <Submenu menuTitle="2" matches={match} {...this.props} {...this.state} />}
            />
          </CSSTransitionGroup>
        </div>
      </div>
    )
  }
}

// App Container
const mapStateToProps = (state, ownProps) => ({
  menuToggle: state.menuToggle,
  submenu: state.submenu,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
