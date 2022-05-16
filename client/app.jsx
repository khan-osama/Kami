import React from 'react';
import Home from './pages/home';
import Navbar from './components/navbar';
import parseRoute from '../server/parse-route';
import SearchPage from './pages/search';
import Airing from './pages/airing';
import Upcoming from './pages/upcoming';
import Top from './pages/top';
import Schedule from './pages/schedule';
import Details from './pages/details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      airing: [],
      upcoming: [],
      route: parseRoute(window.location.hash),
      search: '',
      animeClicked: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.getAnimeClicked = this.getAnimeClicked.bind(this);
  }

  componentDidMount() {
    this.getAiringAnime();
    this.getUpcomingAnime();
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

  getAnimeClicked(event) {
    this.setState({
      animeClicked: event.target.innerHTML
    });
  }

  handleChange(event) {
    this.setState({
      search: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    window.location.hash = 'search?keyword=' + this.state.search;
  }

  resetSearch() {
    this.setState({
      searchResults: []
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'home' || route.path === '') {
      return <Home handleChange={this.handleChange} airing={this.state.airing} upcoming={this.state.upcoming} handleSubmit={this.handleSubmit} getAnimeClicked={this.getAnimeClicked} />;
    }
    if (route.path === 'search') {
      return <SearchPage search = {this.state.search} getAnimeClicked={this.getAnimeClicked}/>;
    }
    if (route.path === 'airing') {
      return <Airing airing={this.state.airing} getAnimeClicked={this.getAnimeClicked} />;
    }
    if (route.path === 'upcoming') {
      return <Upcoming upcoming={this.state.upcoming} getAnimeClicked={this.getAnimeClicked} />;
    }
    if (route.path === 'top') {
      return <Top getAnimeClicked={this.getAnimeClicked} />;
    }
    if (route.path === 'schedule') {
      return <Schedule getAnimeClicked={this.getAnimeClicked} />;
    }
    if (route.path === 'details') {
      return <Details animeClicked={this.state.animeClicked} />;
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
