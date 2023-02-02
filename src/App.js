import './App.css';
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
import axios from 'axios';

import { Next } from 'react-bootstrap/esm/PageItem';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 0,
      loginStatus: false,
      users: [],
      interval: '',
      currentUser: {},

      isAdmin: false,
    }
  }

  componentDidMount() {
    setTimeout(this.userLogin, 1000)
  }

  userLogin = async () => {
    let testUser = {};

    if (this.props.auth0.isAuthenticated) {
      testUser = await this.getOneUser(this.props.auth0.user.email);

      this.setState({
        currentUser: testUser,
      })
    }

    // if invalid user (typeof === string), create a user
    if (typeof (testUser) === 'string') {
      this.createUser();


      let url = `${process.env.REACT_APP_SERVER}/MailjetAPI?userEmail=${this.props.auth0.user.email}&userName=${this.props.auth0.user.name}`;

      await axios.get(url);

      testUser = await this.getOneUser(this.props.auth0.user.email);

      this.setState({
        currentUser: testUser,
      })
    }
  }

  getOneUser = async (email) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/user/${email}`;
      let userData = await axios.get(url);

      this.setState({
        users: [userData.data]
      });

      return userData.data;

    } catch (error) {
      console.log(error.message);
      Next(error);
    }
  }

  createUser = async () => {
    // Create updated user
    let userToUpdate = {
      name: this.props.auth0.user.name,
      email: this.props.auth0.user.email,
    };

    try {
      // Configure axios request
      let config = {
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER}/users`,
        data: userToUpdate,
      }

      // Axios request
      await axios(config);

      // Get user
      let newUser = await this.getOneUser(userToUpdate.email);

      this.setState({
        currentUser: newUser
      })

    } catch (error) {
      console.log(error.message);

      Next(error);
    }
  }

  render() {
    return (
      <>
        <Router>
          <Header
            isAdmin={this.state.currentUser.isAdmin}
          />
          <Routes>
            
            <Route
              exact path="/"
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
              element={<Search auth0User={this.props.auth0.isAuthenticated ? this.props.auth0.user : null} />}
            >
            </Route>
            <Route
              exact path="/Admin"
              element={<Admin />}
            >
            </Route>
            <Route
              exact path="/Profile"
              element={<Profile auth0User={this.props.auth0.isAuthenticated ? this.props.auth0.user : null} />}
            >
            </Route>
          </Routes>
        </Router>
        {
          this.props.auth0.isAuthenticated ?
            <>
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