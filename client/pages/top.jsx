import React from 'react';

export default class Top extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: []
    };
    this.getTopAnime = this.getTopAnime.bind(this);
  }

  render() {
    const { top } = this.state;
    return (
      <div className='home-container'>
        <div className="container top-page">
          <div className="row">
            <div className="col-sm">
              <div className='up-link'>
                <h1>Top Anime</h1>
              </div>
            </div>
          </div>
          <div className="row anime-row">
            {top.map((obj, index) => {
              return (
                <div key={obj.mal_id} className='col-sm top-anime'>
                  <div className='rankings'>{index + 1}</div>
                  <img className='top-anime-img' src={`${obj.images.jpg.image_url}`}></img>
                  <h4 className='top-anime-title'>{obj.title}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getTopAnime();
  }

  getTopAnime() {
    fetch('https://api.jikan.moe/v4/top/anime?type=tv')
      .then(data => {
        return data.json();
      })
      .then(anime => {
        this.setState({
          top: anime.data
        });
      });
  }
}
