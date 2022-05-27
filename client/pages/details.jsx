import React from 'react';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animeInfo: '',
      relatedAnime: [],
      episodes: [],
      reviews: []
    };
    this.getAnimeDetails = this.getAnimeDetails.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleNewReview = this.handleNewReview.bind(this);
  }

  render() {
    const { relatedAnime } = this.state;
    const { animeId } = this.props;
    const { episodes } = this.state;
    const { savedAnime } = this.props;
    const { userToken } = this.props;
    const { reviews } = this.state;
    const slicedEpisodes = episodes.slice(0, 50);

    let button = '';
    let submit = '';

    const found = savedAnime.some(obj => obj.malId === parseInt(animeId));
    if (userToken === '') {
      button = <button className='disabled-save-button' disabled>Save Anime</button>;
      submit = <input type='submit' value='Submit' id='review-submit-disabled' disabled></input>;
    } else {
      submit = <input type='submit' value='Submit' id='review-submit'></input>;
      if (found) {
        button = <button className='unsave-button'>Unsave Show</button>;
      } else {
        button = <button className='save-button' onClick={this.handleSave}>Save Anime</button>;
      }
    }

    if (!this.state.animeInfo || !this.state.relatedAnime) return null;
    return (
      <div key={animeId} className='details-container'>
        <div className='hero-img-row'>
          <div className='container details-section'>
            <div className="row details">
              <div className='col-sm col-md details-anime'>
                <img className='details-anime-img' src={`${this.state.animeInfo.images.jpg.image_url}`}></img>
                {button}
              </div>
              <div className='col-sm col-md anime-data'>
                <h4>{this.state.animeInfo.title}</h4>
                <p>{`${this.state.animeInfo.synopsis}`}</p>
              </div>
            </div>
          </div>
          <div className='background-container'>
              <div className='container info-section'>
                <div className='row'>
                  <div className='col-sm col-md airing-info'>
                    <div className='anime-airing'>
                      <p className='br-info'>Episodes<br></br><span>{this.state.animeInfo.episodes !== null ? this.state.animeInfo.episodes : 'N/A'}</span></p>
                      <p className='br-info'>Status<br></br><span>{this.state.animeInfo.status}</span></p>
                      <p className='br-info'>Type<br></br><span>{this.state.animeInfo.type}</span></p>
                      <p className='br-info'>Rating<br></br><span>{this.state.animeInfo.score !== null ? this.state.animeInfo.score : 'N/A'}</span></p>
                      <p className='br-info'>Air Dates<br></br><span>{this.state.animeInfo.aired.string}</span></p>
                    </div>
                  </div>
                  <div className='col-sm col-md'>
                    <div className='row related-row'>
                      <h5>Related Shows</h5>
                      {relatedAnime.filter(anime => anime.relation === 'Sequel' || anime.relation === 'Prequel').map((obj, index) => {
                        return (
                          <div key={obj.relation} className='col-sm related-elements'>
                            <img className='related-anime-img' src={`${this.state.animeInfo.images.jpg.image_url}`}></img>
                            <div className='related-info'>
                              <p className='relation'>{obj.relation}</p>
                              <a href={'#details?animeId=' + obj.entry[0].mal_id} onClick={this.getAnimeDetails}>{obj.entry[0].name}</a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className='row episodes-row'>
                      <h5>Episode List</h5>
                    </div>
                    <div className='row'>
                      <div className='episodes-info'>
                        <div className='col-sm col-md ep-col'>
                          {slicedEpisodes.map((obj, index) => {
                            return (
                              <p key={obj.mal_id} className='episodes'>{obj.mal_id}. {obj.title}</p>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-sm col-md review-row'>
                        <h5>Reviews</h5>
                        <form id='reviewform' onSubmit={this.handleNewReview}>
                          <textarea type='review' name='review' form='reviewform' defaultValue='Leave a review...'></textarea>
                          {submit}
                        </form>
                      </div>
                    </div>
                    <div className='row user-reviews'>
                      <div className='episodes-info'>
                        <div className='col-sm col-md'>
                          {reviews.map((obj, index) => {
                            return (
                              <div key={obj.reviewId}>
                                <h5 className='username'>{obj.fullName}</h5>
                                <p>{obj.reviewText}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.animeId !== this.props.animeId) {
      this.getAnimeDetails();
    }
  }

  getAnimeDetails() {
    const { animeId } = this.props;
    fetch(`https://api.jikan.moe/v4/anime/${animeId}`)
      .then(data => {
        return data.json();
      })
      .then(anime => this.setState({
        animeInfo: anime.data
      }));
    fetch(`https://api.jikan.moe/v4/anime/${animeId}/relations`)
      .then(data => {
        return data.json();
      })
      .then(anime => {
        this.setState({
          relatedAnime: anime.data
        });
      });
    fetch(`https://api.jikan.moe/v4/anime/${animeId}/episodes`)
      .then(data => {
        return data.json();
      })
      .then(episodes => this.setState({ episodes: episodes.data }));
    fetch(`/api/reviews/${animeId}`)
      .then(data => {
        return data.json();
      })
      .then(reviews => this.setState({ reviews }))
      .catch(err => console.error(err));
  }

  handleSave() {
    const { animeInfo } = this.state;

    const data = {
      malId: animeInfo.mal_id,
      animeTitle: animeInfo.title,
      imageURL: animeInfo.images.jpg.image_url
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': this.props.userToken
      },
      body: JSON.stringify(data)
    };

    fetch('/api/saved', options)
      .then(data => {
        return data.json();
      })
      .catch(err => console.error(err));
  }

  handleNewReview(event) {
    event.preventDefault();
    const { animeInfo } = this.state;
    const { reviews } = this.state;
    const updateReviews = reviews.slice();

    const data = {
      malId: animeInfo.mal_id,
      reviewText: event.target.review.value
    };

    const form = event.target;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': this.props.userToken
      },
      body: JSON.stringify(data)
    };

    fetch('/api/reviews', options)
      .then(data => {
        return data.json();
      })
      .then(result => {
        form.reset();
        updateReviews.push(result);
        this.setState({
          reviews: updateReviews
        });
      })
      .catch(err => console.error(err));
  }
}
