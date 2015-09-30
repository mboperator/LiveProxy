import React from 'react';
import {
  Navbar, Nav, NavItem,
  NavDropdown, MenuItem
} from 'react-bootstrap';

export default class NavBar extends React.Component {
  render() {
    return (
      <Navbar brand='LiveProxy'>
        <Nav right>
            <NavItem eventKey={1} href='#/viewer'>
                Server State
            </NavItem>
            <NavItem eventKey={1} href='#/posts'>
                Posts
            </NavItem>
            <NavDropdown title='JSON API'>
              <MenuItem href='http://localhost:8091/api/mock/posts'>
                Posts
              </MenuItem>

              <MenuItem href='http://localhost:8091/api/mock/comments'>
                Comments
              </MenuItem>

              <MenuItem href='http://localhost:8091/api/mock/users'>
                Users
              </MenuItem>
            </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}
