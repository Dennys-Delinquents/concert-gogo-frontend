import './Header.scss';
import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withAuth0 } from "@auth0/auth0-react";
import Login from './Login';
import Logout from './Logout';

class Header extends React.Component {
  render() {
    return (
      <>
        <header>

          <h3 className='box--gradient silver'>CONCERT-GOGO</h3>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            {
              this.props.auth0.isAuthenticated ?
                <>
                  <Logout />
                </>
                :
                <Login />
            }
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