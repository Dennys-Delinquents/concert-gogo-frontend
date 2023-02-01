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
      keyword:'',
      error: false,
      errorMessage: '',
    }
  }

  handleInput = (e) => {
    this.setState({
      location: e.target.value
    })
  }

  getLocationData = async (e) => {
    e.preventDefault();

    try {
      let url = `${process.env.REACT_APP_SERVER}/events?searchQuery=${this.state.location}`

      let locationDataFromAxios = await axios.get(url)
      
      console.log(locationDataFromAxios);
      this.setState({
        locationData: locationDataFromAxios.data[0],
        locationData2: locationDataFromAxios.data[1],
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
      <p>search by city</p>
      <Form onSubmit={this.getLocationData}>
        <Form.Group>
          <Form.Label as='form-label'>Events by City:</Form.Label>

          <Form.Control type='text' placeholder='cityname here. not sure how many ways i can spell this out for you' onInput={this.handleInput}></Form.Control>
          <Button type='submit'>submit</Button>
        </Form.Group>
      </Form>
      {
        this.state.error
        ? <Alert variant="warning">{this.state.errorMessage}</Alert>
        :<Container>
          <ListGroup as='list-group'>
            <ListGroup.Item>{this.state.locationData.event}</ListGroup.Item>
            <ListGroup.Item>{this.state.locationData.url}</ListGroup.Item>
            <ListGroup.Item>{this.state.locationData.image}</ListGroup.Item>
            <ListGroup.Item>{this.state.locationData.dateTime}</ListGroup.Item>
          </ListGroup>
          <ListGroup as='list-group'>
            <ListGroup.Item>{this.state.locationData2.event}</ListGroup.Item>
            <ListGroup.Item>{this.state.locationData2.url}</ListGroup.Item>
            <ListGroup.Item>{this.state.locationData2.image}</ListGroup.Item>
            <ListGroup.Item>{this.state.locationData2.dateTime}</ListGroup.Item>
          </ListGroup>
        </Container>
      }
      </>
    );
  }
}
export default Search;