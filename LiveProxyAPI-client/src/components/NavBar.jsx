import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

export default class NavBar extends React.Component {
  render() {
    return (
      <Navbar brand='LiveProxy'>
        <Nav>
            <NavItem eventKey={1} href='#/viewer'>
                Server State
            </NavItem>
            <NavItem eventKey={1} href='#/posts'>
                Posts
            </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
