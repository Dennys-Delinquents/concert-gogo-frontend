import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import john from './images/johnPicture.jpg';
import mike from './images/mikePicture.jpg';
import steve from './images/stevePicture.jpg';
import ty from './images/tyPicture.jpg';

class About extends React.Component {
  render() {
    return (
      <>
        <div className="main-body">
          <Carousel slide={false} controls={true}>
            <Carousel.Item>
              <div className="carousel-bg">
                <img
                  src={john}
                  alt="John Chavez - developer"
                />
              </div>

              <div className='profile-caption'>
                <h4>John Chavez</h4>
                <p>Favorite band: Metallica</p>
                <p>Favorite song: All Nightmare Long</p>
                <p>Instruments: Guitar, piano</p>
                <p>Fun fact: I used to be able to play 90% of All Nightmare Long on my guitar</p>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div className="carousel-bg">
                <img
                  src={mike}
                  alt="Mike Shen - developer"
                />
              </div>

              <div className='profile-caption'>
                <h4>Mike Shen</h4>
                <p>Favorite band: Queen</p>
                <p>Favorite song: Hotel California</p>
                <p>Best concert: BB King</p>
                <p>Instruments: Guitar, piano</p>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div className="carousel-bg">
                <img
                  src={steve}
                  alt="Steve Gant - developer"
                />
              </div>

              <div className='profile-caption'>
                <h4>Steve Gant</h4>
                <p>Favorite band: Tool</p>
                <p>Favorite song: H.</p>
                <p>Instruments: Guitar, bass, kalimba, unclean vocals</p>
                <p>Fun Fact: I'm really good at singing in the car... if the stereo drowns me out</p>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div className="carousel-bg">
                <img
                  src={ty}
                  alt="Ty Aponte - developer"
                />
              </div>

              <div className='profile-caption'>
                <h4>Ty Aponte</h4>
                <p>Favorite band: Bilmuri</p>
                <p>Favorite song: A Hogmans Delight</p>
                <p>Best concert: A Day to Remember, Right Back at it Again tour</p>
                <p>Instruments: Guitar, bass, kalimba, unclean vocals</p>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </>
    );
  }
}

export default About;
