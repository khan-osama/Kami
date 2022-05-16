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
                  <a href={'#details?anime=' + obj.title} className='upcoming-anime-title' onClick={this.props.getAnimeClicked}>{obj.title}</a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
