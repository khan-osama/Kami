import React from 'react';

export default class Airing extends React.Component {
  render() {
    const { airing } = this.props;

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
                  <h4 className='airing-anime-title'>{obj.title}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}