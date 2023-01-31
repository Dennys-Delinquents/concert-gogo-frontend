import './App.css';
import Login from './Login.js';
import Logout from './Logout.js';
import Profile from './Profile.js';
import { withAuth0 } from "@auth0/auth0-react";
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import About from './About.js';
import Header from './Header.js';
import Home from './Home.js';
import Search from './Search.js';
import Admin from './Admin.js';

class App extends React.Component {
  render() {
    return (
      <>
        {
          this.props.auth0.isAuthenticated ?
            <>
              <Logout />
            </>
            :
            <Login />
        }
        <Router>
          <Header />
          <Routes>
            <Route
              exact path="/Home"
              element={<Home />}
            >
            </Route>
            <Route
              exact path="/About"
              element={<About />}
            >
            </Route>
            <Route
              exact path="/Search"
              element={<Search />}
            >
            </Route>
            <Route
              exact path="/Admin"
              element={<Admin />}
            >
            </Route>
            <Route
              exact path="/Profile"
              element={<Profile />}
            >
            </Route>
          </Routes>
          {/* <Footer /> */}
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
