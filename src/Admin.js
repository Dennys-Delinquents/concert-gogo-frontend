import { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import UpdateUserForm from './UpdateUserForm';
import axios from 'axios';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/users`;

      let userData = await axios.get(url);
      console.log(userData.data);
      this.setState({
        users: userData.data
      });

    } catch (error) {
      console.log(error.message);
    }
  }

  deleteUser = async (id) => {
    try {
      // TODO: use axios to send the ID to the server on the path param
      let url = `${process.env.REACT_APP_SERVER}/users/${id}`;
      console.log(url);

      await axios.delete(url);

      // TODO: update state to remove the deleted cat
      let updatedUsers = this.state.users.filter(user => user._id !== id);
      console.log(updatedUsers);

      this.setState({
        users: updatedUsers
      });
    }
    catch (error) {
      console.log(error.message)
    }
  }


  render() {
    /* TODO: render information about the developers */
    return (
      <>
        <p>Admin page</p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
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
                  <td>{user.searchHistory}</td>
                  <td>{user.events}</td>
                  <td>{user.isAdmin ? 'true' : 'false'}</td>
                  <UpdateUserForm
                    user={user}
                    getUsers={this.getUsers}
                  />
                  <td><Button onClick={() => this.deleteUser(user._id)}>Delete</Button></td>

                </tr>


              );
            })}
          </tbody>
        </Table>
      </>

    );
  }
}
export default Admin;