import React, { Component } from 'react';

import MenuItems from './MenuItems';

export default class Submenu extends Component {
  render() {
    const matchingNav = this.props.data.find(x => x.ID === +this.props.matches.params.id);
    const children = matchingNav ? matchingNav.children : [];
    const title = matchingNav ? matchingNav.title : "";

    //console.log('Data Extract: ', children );

    // TODO: Add back button with the menu name (see Amazon example)
    // TODO: replace the onClick with <Link />
    // TODO: disable if link is "#" or empty

    console.log(this.props.matches.params.id);

    return (
      <nav className="light-menu light-submenu">
        <span onClick={() => this.props.history.goBack()} className="light-menu-item menu-bb">
          <span className="light-menu-arrow-link light-menu-arrow-link-back"><span className="light-menu-arrow light-menu-arrow-back">&lt;</span></span>
          <span className="light-menu-link light-submenu-back">Main Menu</span>
        </span>
        <span className="light-menu-item menu-bb">
          <span className="light-menu-link light-submenu-title">{title}</span>
        </span>
        <MenuItems data={children} />
      </nav>
    )
  }
}
