import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      loading: true
    };
    this.getSearchAnime = this.getSearchAnime.bind(this);
  }

  render() {
    const apiResponse = this.state.searchResults;
    if (this.state.loading === true) {
      return (
        <Spinner className='loading' animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    } else {
      if (apiResponse.length !== 0) {
        return (
          <div className='search-container'>
              <div className="container search-page">
              <div className="row">
                <div className="col-sm">
                  <div className='search-link'>
                    <h1>Search Results</h1>
                  </div>
                </div>
              </div>
              <div className="row anime-row">
              {apiResponse.map((obj, index) => {
                return (
                    <div key={obj.mal_id} className='col-sm search-anime'>
                      <img className='search-anime-img' src={`${obj.images.jpg.image_url}`}></img>
                      <a href={'#details?animeId=' + obj.mal_id} className='search-anime-title'>{obj.title}</a>
                    </div>
                );
              })}
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className='not-found-container'>
            <div className="not-found-row">
                <div className='not-found'>
                  <img className='saitama-ok' src="https://cdn.shopify.com/s/files/1/1158/2192/products/One-punch-man-saitama-ok-decal-black.jpg?v=1455425385"></img>
                  <h1 id='not-found'>Sorry, no results found!</h1>
                </div>
            </div>
        </div>
      );
    }
  }

  componentDidMount() {
    this.getSearchAnime();
  }

  getSearchAnime() {
    const searchQuery = this.props.search;
    fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}&sfw&sort=asc&type=special&type=tv`)
      .then(data => {
        return data.json();
      })
      .then(anime => {
        this.setState({
          searchResults: anime.data,
          loading: false
        });
      });
  }
}
