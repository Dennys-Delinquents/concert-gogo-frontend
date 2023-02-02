import React from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withAuth0 } from "@auth0/auth0-react";

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

      let searchHistory = location + ' , ' + keyword;

      this.updateUser(searchHistory);

    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `${error.message}`
      })
    }
  }

  getOneUser = async (email) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/user/${email}`;

      let userData = await axios.get(url);

      return userData.data;

    } catch (error) {
      console.log(error.message);
    }
  }

  updateUser = async (searchObj) => {
    let user = await this.getOneUser(this.props.auth0User.email);

    // Create updated user
    user.searchHistory.push(searchObj);

    try {
      // Configure axios request
      let config = {
        method: 'PUT',
        url: `${process.env.REACT_APP_SERVER}/users/${user._id}`,
        data: user,
      }

      // Axios request
      await axios(config);

    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <>
        <div className="main-body">
          <Form onSubmit={this.getEventData}>
            <div className="search-box">
              <Form.Group controlId="location" id="state-field">
                <Form.Control type='text' placeholder='State'></Form.Control>
              </Form.Group>
              <Form.Group controlId="keyword" id="keyword-field">
                <Form.Control type='text' placeholder='Keyword'></Form.Control>
              </Form.Group>
              <Button type='submit' id="submit-button">Let's Go!</Button>
            </div>
          </Form>
          {
            this.state.error
              ? <Alert variant="warning">{this.state.errorMessage}</Alert>
              : <Container>
                {this.state.eventData.map((singleEvent, index) => {
                  return (
                    <div className="search-results" key={index}>
                      <img className="eventImage" src={singleEvent.image} alt='stuff goes here' />
                      <div>
                        <a href={singleEvent.url}>{singleEvent.event}</a>
                        <p>{singleEvent.dateTime}</p>
                      </div>
                    </div>
                  )
                }
                )}
              </Container>
          }
        </div>
      </>
    );
  }
}

export default withAuth0(Search);
