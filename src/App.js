import './App.css';
import Login from './Login.js';
import Logout from './Logout.js';
import Profile from './Profile.js';
import { withAuth0 } from "@auth0/auth0-react";
import React from 'react';

class App extends React.Component {
  render() {
    return (
      <>
        {
          this.props.auth0.isAuthenticated ?
            <>
              <Profile />
              <Logout />
            </>
            :
            <Login />
        }
      </>
    );
  }
}

export default withAuth0(App);
