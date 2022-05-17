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
      route: parseRoute(window.location.hash),
      search: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
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
    const navLinks = document.getElementsByClassName('nav-link');
    for (let i = 0; i < navLinks.length; i++) {
      navLinks[i].className = 'nav-link';
    }

    this.setState({
      searchResults: []
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'home' || route.path === '') {
      return <Home handleChange={this.handleChange} handleSubmit={this.handleSubmit} />;
    }
    if (route.path === 'search') {
      return <SearchPage search = {this.state.search}/>;
    }
    if (route.path === 'airing') {
      return <Airing />;
    }
    if (route.path === 'upcoming') {
      return <Upcoming />;
    }
    if (route.path === 'top') {
      return <Top />;
    }
    if (route.path === 'schedule') {
      return <Schedule />;
    }
    if (route.path === 'details') {
      return <Details animeId={route.params.get('animeId')} />;
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
