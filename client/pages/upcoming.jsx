import React from 'react';

export default class Upcoming extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcoming: []
    };
  }

  render() {
    const { upcoming } = this.state;

    return (
      <div className='home-container'>
        <div className="container upcoming-page">
          <div className="row">
            <div className="col-sm">
              <div className='up-link'>
                <h1>Upcoming</h1>
              </div>
            </div>
          </div>
          <div className="row anime-row">
            {upcoming.map((obj, index) => {
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
    this.getUpcomingAnime();
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
