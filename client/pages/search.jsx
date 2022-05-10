import React from 'react';

export default class SearchPage extends React.Component {
  render() {
    const { searchResults } = this.props;
    const apiResponse = searchResults;
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
                    <h4 className='search-anime-title'>{obj.title}</h4>
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
