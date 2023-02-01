import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

class UpdateUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      updatedUser: {},
    }
  }

  updateUser = async (event) => {
    event.preventDefault();

    // Create udpated user
    let userToUpdate = {
      name: event.target.name.value,
      email: event.target.email.value,
      location: event.target.location.value,
      isAdmin: event.target.isAdmin.value,
      _id: this.props.user._id,
      __v: this.props.user.__v
    };

    try {
      // Configure axios request
      let config = {
        method: 'PUT',
        url: `${process.env.REACT_APP_SERVER}/users/${this.props.user._id}`,
        data: userToUpdate,
      }

      // Axios request
      await axios(config);

      // Get updated users
      this.props.getUsers();

      // Close Modal
      this.setState({ showModal: false })

    } catch (error) {
      console.log(error.message);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    /* TODO: render information about the developers */
    return (
      <>

        <td><Button onClick={() => this.setState({ showModal: true })}>Update</Button></td>

        <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })}>
          <Modal.Header closeButton>Update User</Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.updateUser}>
              <Form.Group controlId="name">
                <Form.Label>Name: </Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={this.props.user.name} />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email: </Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={this.props.user.email} />
              </Form.Group>

              <Form.Group controlId="location">
                <Form.Label>Location: </Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={this.props.user.location} />
              </Form.Group>

              <Form.Group controlId="isAdmin">
                <Form.Label>Admin Status (true=Admin): </Form.Label>
                <Form.Control
                  type="boolean"
                  defaultValue={this.props.user.isAdmin} />
              </Form.Group>

              <Button type="submit">Update</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>

    );
  }
}
export default UpdateUserForm;