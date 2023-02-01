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
        <Carousel>
          <Carousel.Item>
            <div className="carousel-bg">
              <img
                src={john}
                alt="John Chavez - developer"
              />
            </div>

            <div className='profile-caption'>
              <h3>John Chavez</h3>
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
              <h3>Mike Shen</h3>
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
              <h3>Steve Gant</h3>
              <p>Favorite band: Tool</p>
              <p>Favorite song: H.</p>
              <p>Instruments: Guitar, bass, kalimba, unclean vocals</p>
              <p>Fun Fact: I am really good at singing along in the car as long as the stereo drowns out my singing</p>
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
              <h3>Ty Aponte</h3>
              <p>Favorite band: Bilmuri</p>
              <p>Favorite song: A Hogmans Delight</p>
              <p>Best concert: A Day to Remember, Right Back at it Again tour</p>
              <p>Instruments: Guitar, bass, kalimba, unclean vocals</p>
            </div>
          </Carousel.Item>


        </Carousel>
      </>
    );
  }
}

export default About;
