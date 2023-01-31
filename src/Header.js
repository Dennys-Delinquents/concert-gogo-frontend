import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Devs</Navbar.Brand>
        <NavItem><Link to="/About" className="nav-link">About</Link></NavItem>
        <NavItem><Link to="/Search" className="nav-link">Search</Link></NavItem>
        <NavItem><Link to="/Profile" className="nav-link">Profile</Link></NavItem>
        <NavItem><Link to="/Admin" className="nav-link">Admin</Link></NavItem>
        <NavItem><Link to="/Home" className="nav-link">Home</Link></NavItem>

        {/* PLACEHOLDER: render a navigation link to the about page */}
      </Navbar>
    );
  }
}
export default Header;