import React from 'react';
export default class Saved extends React.Component {

  render() {
    const { savedAnime } = this.props;
    if (savedAnime.error) {
      return (
      <div className='log-in'>
        <h1>Please Log in</h1>
      </div>
      );
    }

    if (savedAnime.length === 0) {
      return (
        <div className='no-saves'>
        <h1>Nothing Found!</h1>
      </div>
      );
    }
    return (
      <div className='home-container'>
        <div className="container airing-home-page">
          <div className="row">
            <div className="col-sm">
              <div className='ca-link'>
                <h1>Saved</h1>
              </div>
            </div>
          </div>
          <div className="row anime-row">
            {savedAnime.map((obj, index) => {
              return (
                    <div key={obj.savedId} className='col-sm airing-anime'>
                      <img className='airing-anime-img' src={`${obj.imageURL}`}></img>
                      <a href={'#details?animeId=' + obj.malId} className='airing-anime-title'>{obj.animeTitle}</a>
                    </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.getSavedAnime();
  }
}
