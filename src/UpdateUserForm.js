import { Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

class UpdateUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      updatedUser: {},
    }
  }

  updateUser = async (id) => {
    this.setState({ showModal: true });

    try {
      // TODO: use axios to send the ID to the server on the path param
      let url = `${process.env.REACT_APP_SERVER}/users/${id}`;


      // await axios.put(url);

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

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    /* TODO: render information about the developers */
    return (
      <>

        <td><Button onClick={() => this.setState({showModal: true})}>Update</Button></td>

        <Modal show={this.state.showModal} onHide={() => this.setState({showModal: false})}>
          <Modal.Header closeButton>Update User</Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name: </Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={this.props.user.name} />
              </Form.Group>
              {/* <Form.Group controlId="description">
                <Form.Label>Book Description: </Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={this.props.book.description} />
              </Form.Group>
              <Form.Group controlId="status">
                <Form.Label>Book Availibility: </Form.Label>
                <Form.Control
                  required
                  type="text"
                  defaultValue={this.props.book.status} />
              </Form.Group> */}
              <Button type="submit">Update</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>

    );
  }
}
export default UpdateUserForm;