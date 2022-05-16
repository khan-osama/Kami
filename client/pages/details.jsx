import React from 'react';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animeImg: '',
      animeInfo: ''
    };
  }

  render() {
    return (
      <div className='details-container'>
        <div className='hero-img-row'>
          <div className='container details-section'>
            <div className="row">
              <div className='col-sm schedule-anime'>
                <img className='details-anime-img' src={`${this.state.animeImg}`}></img>
                <button className='save-button'>Save Anime</button>
              </div>
              <div className='col-sm anime-data'>
                <h4>{this.state.animeInfo.title}</h4>
                <p>{`${this.state.animeInfo.synopsis}`}</p>
              </div>
            </div>
            <div className="row">
            </div>
          </div>
          <div className='background-container'>
              <div className='container info-section'>
                <div className='row'>
                  <div className='col-sm airing-info'>
                    <div className='anime-airing'>
                      <p className='br-info'>Episodes<br></br><span>{this.state.animeInfo.episodes}</span></p>
                      <p className='br-info'>Status<br></br><span>{this.state.animeInfo.status}</span></p>
                      <p className='br-info'>Type<br></br><span>{this.state.animeInfo.type}</span></p>
                      <p className='br-info'>Rating<br></br><span>{this.state.animeInfo.score}</span></p>
                    </div>
                  </div>
                  {/* <div className='col-sm'>
                    <div className='row'>
                      <h5>Related Shows</h5>
                      <img className='related-anime-img' src={`${this.state.animeImg}`}></img>
                      <div className='related-info'></div>
                    </div>
                    <div className='row'>

                    </div>
                    <div className='row'>

                    </div>
                    <div className='row'>

                    </div>
                  </div> */}
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getAnimeDetails();
  }

  getAnimeDetails() {
    const { animeClicked } = this.props;
    fetch(`https://api.jikan.moe/v4/anime?q=${animeClicked}`)
      .then(data => {
        return data.json();
      })
      .then(anime => this.setState({
        animeInfo: anime.data[0],
        animeImg: anime.data[0].images.jpg.image_url
      }));
  }
}
