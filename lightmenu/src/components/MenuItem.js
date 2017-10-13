import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class RightArrow extends Component {
  render() {
    console.log('Props: ', this.props);
    const id = this.props.id;

    return (
      <Link className="light-menu-arrow-link" to={`/sub/${id}`}>
        <span className="light-menu-arrow">&gt;</span>
      </Link>
    )
  }
}

function ChildrenArrow(props) {
  const hasChildren = props.children.length;
  if (hasChildren) {
    return <RightArrow {...props} />
  } else {
    return null;
  }
}

export default class MenuItem extends Component {
  render() {
    return (
      <li className={'light-menu-item light-menu-item-' + this.props.id + ' ' + this.props.classes}>
        <a className={'light-menu-link light-menu-link-inner'} href={this.props.url} dangerouslySetInnerHTML={{__html: this.props.label}}></a><ChildrenArrow id={this.props.id} children={this.props.children} />
      </li>
    )
  }
}
