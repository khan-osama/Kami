import React from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

const heroImages = [
  {
    imageURL: 'https://i.imgur.com/rHhl7JK.png'
  },

  {
    imageURL: 'https://images.alphacoders.com/818/818485.png'
  },

  {
    imageURL: 'https://images7.alphacoders.com/114/1143200.jpg'
  },

  {
    imageURL: 'https://images5.alphacoders.com/606/606284.jpg'
  },

  {
    imageURL: 'https://images.alphacoders.com/114/1149848.jpg'
  }
];

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgImage: '',
      airing: [],
      upcoming: []
    };
  }

  render() {
    const { airing } = this.state;
    const { upcoming } = this.state;
    const slicedAiring = airing.slice(0, 5);
    const slicedUpcoming = upcoming.slice(0, 5);

    if (this.state.airing.length === 0 || this.state.upcoming.length === 0) {
      return (
        <Spinner className='loading' animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }

    return (
      <div className='home-container'>
        <div className='bg-image'>
          <img src={`${this.state.bgImage}`}></img>
          <div className='hero-text'>
            <h1>Kami</h1>
            <hr></hr>
            <h2 id='sub-header'>Keep track of all your favorite anime while<br />
              discovering and sharing new ones.
            </h2>
            <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Find Anime"
              className="me-2"
              aria-label="Search"
              onChange={this.props.handleChange}
            />
            <Button href='#search' variant="outline-primary" onClick={this.props.handleSubmit}>Search</Button>
          </Form>
          </div>
        </div>
        <div className="container airing-home-page">
          <div className="row">
            <div className="col-sm">
              <div className='ca-link'>
                <h1>Currently Airing</h1>
                <a href='#airing'>View All</a>
              </div>
            </div>
          </div>
          <div className="row anime-row">
            {slicedAiring.map((obj, index) => {
              return (
                <div key={obj.mal_id} className='col-sm airing-anime'>
                  <img className='airing-anime-img' src={`${obj.images.jpg.image_url}`}></img>
                  <a href={'#details?animeId=' + obj.mal_id} className='airing-anime-title'>{obj.title}</a>
                </div>
              );
            })}
          </div>
        </div>
        <div className="container upcoming-home-page">
          <div className="row">
            <div className="col-sm">
              <div className='ca-link'>
                <h1>Upcoming</h1>
                <a href='#upcoming'>View All</a>
              </div>
            </div>
          </div>
          <div className="row anime-row">
          {slicedUpcoming.map((obj, index) => {
            return (
                <div key={obj.mal_id} className='col-sm upcoming-anime'>
                  <img className='upcoming-anime-img' src={`${obj.images.jpg.image_url}`}></img>
                  <a href={'#details?animeId=' + obj.mal_id} className='upcoming-anime-title'>{obj.title}</a>
                </div>
            );
          })}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getRandomImage();
    this.getAiringAnime();
    this.getUpcomingAnime();
  }

  getRandomImage() {
    const randomImage = heroImages[Math.floor(Math.random() * heroImages.length)].imageURL;
    this.setState({
      bgImage: randomImage
    });
  }

  getAiringAnime() {

    fetch('https://api.jikan.moe/v4/seasons/now')
      .then(data => {
        return data.json();
      })
      .then(anime => {
        this.setState({
          airing: anime.data
        });
      });
  }

  getUpcomingAnime() {
    fetch('https://api.jikan.moe/v4/seasons/upcoming')
      .then(data => {
        return data.json();
      })
      .then(anime => {
        this.setState({
          upcoming: anime.data
        });
      });
  }
}
