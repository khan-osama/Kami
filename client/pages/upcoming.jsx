import React from 'react';

export default class Upcoming extends React.Component {
  render() {
    const { upcoming } = this.props;

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
                  <h4 className='upcoming-anime-title'>{obj.title}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}