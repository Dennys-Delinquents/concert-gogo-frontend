import React from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      locationData: [],
      locationData2: [],
      keyword: '',
      error: false,
      errorMessage: '',
      eventData: [],
    }
  }
  handleInput = (e) => {
    this.setState({
      location: e.target.value
    })
  }
  getEventData = async (e) => {
    e.preventDefault();
    let location = e.target.location.value;
    let keyword = e.target.keyword.value;
    try {
      let url = `${process.env.REACT_APP_SERVER}/events?location=${location}&keyword=${keyword}`
      let eventDataFromAxios = await axios.get(url)

      this.setState({
        eventData: eventDataFromAxios.data,
        error: false,
      })
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `${error.message}`
      })
    }
  }

  render() {
    return (
      <>
        <Form onSubmit={this.getEventData}>
          <Form.Group controlId="location">
            <Form.Label as='form-label'>Events by State:</Form.Label>
            <Form.Control type='text' placeholder='Location'></Form.Control>
          </Form.Group>
          <Form.Group controlId="keyword">
            <Form.Label as='form-label'>Events by keyword:</Form.Label>
            <Form.Control type='text' placeholder='Keyword'></Form.Control>
          </Form.Group>
          <Button type='submit'>SUBMIT</Button>
        </Form>
        {
          this.state.error
            ? <Alert variant="warning">{this.state.errorMessage}</Alert>
            : <Container>
              {this.state.eventData.map((singleEvent) => {
                return (
                  <ListGroup as='list-group'>
                    <ListGroup.Item>{singleEvent.event}</ListGroup.Item>
                    <ListGroup.Item>{singleEvent.url}</ListGroup.Item>
                    <ListGroup.Item>{singleEvent.dateTime}</ListGroup.Item>
                    <ListGroup.Item className="eventImage"><img src={singleEvent.image} alt='stuff goes here'></img></ListGroup.Item>
                  </ListGroup>
                )
              }
              )}
            </Container>
        }
      </>
    );
  }
}
export default Search;