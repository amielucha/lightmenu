import React, { Component } from 'react';

import MenuItem from './MenuItem';

export default class MenuItems extends Component {
  constructor(props){
    // Pass props to parent class
    super(props);
  }

  renderMenuItems() {
    let menuItems = this.props.data;
    //console.log(menuItems);

    return menuItems.map((item) => (
      <MenuItem key={item.ID} id={item.ID} label={item.title} url={item.url} children={item.children} classes={item.classes} />
    ))
  }

  render() {
    return (
      <ul className="light-menu-list">
        {this.renderMenuItems()}
      </ul>
    )
  }
}
