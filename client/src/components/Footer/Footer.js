import React, { Component } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <Nav className="justify-content-center">
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/Aboutpage">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/Contactpage">Contact</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default Footer;
