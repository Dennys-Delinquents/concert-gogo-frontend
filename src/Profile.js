import React from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import './Profile.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          email: '',
          name: '',
          location: '',
          isAdmin: '',
        }

      ],
      showModal: false,
    }
  }

  componentDidMount() {
    // if not authenticated, redirect back to home page
    if (!this.props.auth0.isAuthenticated) window.location.href = `${process.env.REACT_APP_DOMAIN}`;

    this.getOneUser(this.props.auth0User.email);
  }

  getOneUser = async (email) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/user/${email}`;

      let userData = await axios.get(url);

      this.setState({
        users: [userData.data]
      });

    } catch (error) {
      console.log(error.message);
    }
  }

  updateUser = async (event) => {
    event.preventDefault();
    await this.getOneUser(this.props.auth0User.email);

    // Create updated user
    let userToUpdate = {
      name: event.target.name.value,
      email: event.target.email.value,
      location: event.target.location.value,
      isAdmin: this.state.users[0].value,
      _id: this.state.users[0]._id,
      __v: this.state.users[0].__v
    };

    try {
      // Configure axios request
      let config = {
        method: 'PUT',
        url: `${process.env.REACT_APP_SERVER}/users/${userToUpdate._id}`,
        data: userToUpdate,
      }

      // Axios request
      await axios(config);

      // Get updated users
      this.getOneUser(userToUpdate.email);

      // Close Modal
      this.setState({ showModal: false })

    } catch (error) {
      console.log(error.message);
    }
  };

  deleteUser = async (id) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/users/${id}`;

      await axios.delete(url);

      window.location.href = `${process.env.REACT_APP_DOMAIN}`;

    }
    catch (error) {
      console.log(error.message)
    }
  }

  render() {
    /* TODO: render information about the developers */
    return (
      <>
        <div className="main-body">
          <Table bordered className="profile-table">
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

                    <td><Button onClick={() => this.setState({ showModal: true })}>Update</Button></td>
                    <td><Button onClick={() => this.deleteUser(user._id)}>Delete</Button></td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
            <Modal.Header closeButton>Update User</Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.updateUser}>
                <Form.Group controlId="name">
                  <Form.Label>Name: </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    defaultValue={this.state.users[0].name} />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email: </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={this.state.users[0].email} />
                </Form.Group>

                <Form.Group controlId="location">
                  <Form.Label>Location: </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={this.state.users[0].location} />
                </Form.Group>
                <Button type="submit">Update</Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </>
    );
  }
}

// export default Profile;
export default withAuth0(Profile);
