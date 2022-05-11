import React from 'react';
import Home from './pages/home';
import Navbar from './components/navbar';
import parseRoute from '../server/parse-route';
import SearchPage from './pages/search';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      airing: [],
      upcoming: [],
      route: parseRoute(window.location.hash),
      search: '',
      searchResults: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.getSearchAnime = this.getSearchAnime.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
  }

  componentDidMount() {
    this.getAiringAnime();
    this.getUpcomingAnime();
    this.getSearchAnime();
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  getAiringAnime() {

    fetch('https://api.jikan.moe/v4/seasons/now')
      .then(data => {
        return data.json();
      })
      .then(anime => {
        this.setState({
          airing: anime.data
        });
      });
  }

  getUpcomingAnime() {
    fetch('https://api.jikan.moe/v4/seasons/upcoming')
      .then(data => {
        return data.json();
      })
      .then(anime => {
        this.setState({
          upcoming: anime.data
        });
      });
  }

  getSearchAnime() {
    const searchQuery = this.state.search;
    fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}&sfw&order_by=popularity&sort=desc&type=tv`)
      .then(data => {
        return data.json();
      })
      .then(anime => {
        this.setState({
          searchResults: anime.data
        });
      });
  }

  handleChange(event) {
    this.setState({
      search: event.target.value
    });
  }

  resetSearch() {
    this.setState({
      searchResults: []
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'home') {
      return <Home handleChange={this.handleChange} search={this.state.search} airing={this.state.airing} upcoming={this.state.upcoming} getSearchAnime={this.getSearchAnime} />;
    }
    if (route.path === 'search') {
      return <SearchPage searchResults={this.state.searchResults} />;
    }
  }

  render() {
    return (
      <div>
        <Navbar route={this.state.route} resetSearch={this.resetSearch} />
        { this.renderPage() }
      </div>
    );
  }
}
