import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
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

    if (this.state.top.length === 0) {
      return (
        <Spinner className='loading' animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }
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
                  <a href={'#details?animeId=' + obj.mal_id} className='top-anime-title'>{obj.title}</a>
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
    const topRequests = Array(4).fill().reduce((previous, _, index) => {
      const pageNum = index + 1;
      return previous.then(top => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            fetch(`https://api.jikan.moe/v4/top/anime?type=tv&page=${pageNum}`)
              .then(res => res.json())
              .then(page => resolve(page));
          }, 800);
        }).then(nextPage => top.concat(nextPage.data));
      });
    }, Promise.resolve([]));

    topRequests
      .then(top => this.setState({ top }));
  }
}
