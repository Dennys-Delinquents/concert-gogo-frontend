import './Admin.css';
import { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import UpdateUserForm from './UpdateUserForm';
import axios from 'axios';
import './Profile.css';


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      nameSortStatus: true,
      emailSortStatus: true,
      adminSortStatus: true,
      locationSortStatus: true,
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/users`;

      let userData = await axios.get(url);
      this.setState({
        users: userData.data
      });

    } catch (error) {
      console.log(error.message);
    }
  }

  deleteUser = async (id) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/users/${id}`;

      await axios.delete(url);

      let updatedUsers = this.state.users.filter(user => user._id !== id);

      this.setState({
        users: updatedUsers
      });
    }
    catch (error) {
      console.log(error.message);
    }
  }

  clearSearchHistory = async (user) => {

    // Create udpated user
    let userToUpdate = user;
    userToUpdate.searchHistory = [];

    try {
      // Configure axios request
      let config = {
        method: 'PUT',
        url: `${process.env.REACT_APP_SERVER}/users/${user._id}`,
        data: userToUpdate,
      }

      // Axios request
      await axios(config);

      // Get updated users
      this.getUsers();

    } catch (error) {
      console.log(error.message);
    }
  };

  sortName = () => {
    this.state.nameSortStatus === true ? this.setState({ nameSortStatus: false }) : this.setState({ nameSortStatus: true })

    let sortedUsers = []

    this.state.nameSortStatus === true
      ? sortedUsers = this.state.users.sort((a, b) => a.name < b.name ? 1 : -1)
      : sortedUsers = this.state.users.sort((a, b) => a.name < b.name ? -1 : 1)

    this.setState({
      users: sortedUsers
    })
  }

  sortEmail = () => {
    this.state.emailSortStatus === true ? this.setState({ emailSortStatus: false }) : this.setState({ emailSortStatus: true })

    let sortedUsers = []

    this.state.emailSortStatus === true
      ? sortedUsers = this.state.users.sort((a, b) => a.email < b.email ? 1 : -1)
      : sortedUsers = this.state.users.sort((a, b) => a.email < b.email ? -1 : 1)

    this.setState({
      users: sortedUsers
    })
  }

  sortAdmin = () => {
    this.state.adminSortStatus === true ? this.setState({ adminSortStatus: false }) : this.setState({ adminSortStatus: true })

    let sortedUsers = []

    this.state.adminSortStatus === true
      ? sortedUsers = this.state.users.sort((a, b) => a.isAdmin < b.isAdmin ? 1 : -1)
      : sortedUsers = this.state.users.sort((a, b) => a.isAdmin < b.isAdmin ? -1 : 1)

    this.setState({
      users: sortedUsers
    })
  }

  sortLocation = () => {
    this.state.locationSortStatus === true ? this.setState({ locationSortStatus: false }) : this.setState({ locationSortStatus: true })

    let sortedUsers = []

    this.state.locationSortStatus === true
      ? sortedUsers = this.state.users.sort((a, b) => a.location < b.location ? 1 : -1)
      : sortedUsers = this.state.users.sort((a, b) => a.location < b.location ? -1 : 1)

    this.setState({
      users: sortedUsers
    })
  }

  render() {
    /* TODO: render information about the developers */
    return (
      <>
        <div className="main-body">
          <Table bordered className="profile-table">
            <thead>
              <tr>
                <th><Button onClick={this.sortName} variant='secondary'>Name</Button></th>
                <th><Button onClick={this.sortEmail} variant='secondary'>Email</Button></th>
                <th><Button onClick={this.sortLocation} variant='secondary'>Location</Button></th>
                <th>Search History</th>
                <th>Events</th>
                <th>Admin Status</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>

              {this.state.users.map((user, index) => {
                return (

                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.location}</td>
                    <td>{user.searchHistory.toString()}<Button onClick={() => this.clearSearchHistory(user)} className='clear-button'>Clear</Button></td>
                    <td>{user.events}</td>
                    <td>{user.isAdmin ? 'true' : 'false'}</td>
                    <UpdateUserForm
                      user={user}
                      getUsers={this.getUsers}
                    />
                    <td><Button onClick={() => this.deleteUser(user._id)} variant='danger'>Delete</Button></td>

                  </tr>


                );
              })}
            </tbody>
          </Table>
        </div>
      </>

    );
  }
}
export default Admin;