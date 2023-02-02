import './Header.css';
import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withAuth0 } from "@auth0/auth0-react";
import Login from './Login.js';
import Logout from './Logout.js';

class Header extends React.Component {
  render() {
    return (
      <>
        <header>
          {
            this.props.auth0.isAuthenticated ?
              <>
                <Logout />
              </>
              :
              <Login />
          }
          <h3 className='metal linear'>CONCERT-GOGO</h3>
          {/* <Navbar.Brand>CONCERT-GOGO</Navbar.Brand> */}
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>

            {this.props.auth0.isAuthenticated
              ? <>
                <NavItem><Link to="/Search" className="nav-link">Search</Link></NavItem>
                <NavItem><Link to="/About" className="nav-link">About</Link></NavItem>
                <NavItem><Link to="/Profile" className="nav-link">Profile</Link></NavItem>

              </>
              : null
            }
            {this.props.isAdmin
              ? <NavItem><Link to="/Admin" className="nav-link">Admin</Link></NavItem>
              : null}


          </Navbar>
        </header>
      </>
    );
  }
}

export default withAuth0(Header);
