import React from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';

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
  render() {
    const { airing } = this.props;
    const { upcoming } = this.props;
    const slicedAiring = airing.slice(0, 5);
    const slicedUpcoming = upcoming.slice(0, 5);

    return (
      <div className='home-container'>
        <div className='bg-image'>
          <img src={`${this.getRandomImage()}`}></img>
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
                  <h4 className='airing-anime-title'>{obj.title}</h4>
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
                  <h4 className='upcoming-anime-title'>{obj.title}</h4>
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
  }

  getRandomImage() {
    const randomImage = heroImages[Math.floor(Math.random() * heroImages.length)].imageURL;
    return randomImage;
  }
}
