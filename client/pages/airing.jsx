import React from 'react';

export default class Airing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      airing: []
    };
  }

  render() {
    const { airing } = this.state;

    return (
      <div className='home-container'>
        <div className="container airing-home-page">
          <div className="row">
            <div className="col-sm">
              <div className='ca-link'>
                <h1>Currently Airing</h1>
              </div>
            </div>
          </div>
          <div className="row anime-row">
            {airing.map((obj, index) => {
              return (
                <div key={obj.mal_id} className='col-sm airing-anime'>
                  <img className='airing-anime-img' src={`${obj.images.jpg.image_url}`}></img>
                  <a href={'#details?animeId=' + obj.mal_id} className='airing-anime-title'>{obj.title}</a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getAiringAnime();
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
}
