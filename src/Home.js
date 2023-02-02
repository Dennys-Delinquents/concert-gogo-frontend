import { Component } from 'react';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData: [],
    }
  }

  componentDidMount() {
    this.getNews();
  }

  getNews = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/NewsAPI`;

      let data = await axios.get(url);
      this.setState({
        newsData: data.data
      });

    } catch (error) {
      console.log(error.message);
    }
  }

  render() {

    return (
      <>
        <div className='main-body'>
          <h1>Latest News:</h1>
          <div className='news'>
            {this.state.newsData.map((singleNews, index) => {
              return (
                <div key={index}>
                  <a className="news-title" href={singleNews.url}>{singleNews.title}</a>
                  <p className="news-description">{singleNews.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
export default Home;
