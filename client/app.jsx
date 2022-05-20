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
import AppContext from './lib/app-context';
import SignUpForm from './components/sign-up';
import SignInForm from './components/sign-in';
import ClientError from '../server/client-error';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      search: '',
      errMessage: false,
      loginSuccess: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
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

  handleSignUp(event) {
    event.preventDefault();

    const data = {
      fullName: event.target.name.value,
      email: event.target.email.value,
      username: event.target.username.value,
      password: event.target.password.value
    };
    const form = event.target;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch('/sign-up', options)
      .then(data => {
        return data.json();
      })
      .then(result => {
        form.reset();
      })
      .catch(err => console.error(err));
  }

  resetSearch() {
    this.setState({
      searchResults: []
    });
  }

  handleSignIn(event) {
    event.preventDefault();

    const data = {
      username: event.target.username.value,
      password: event.target.password.value
    };

    const form = event.target;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch('/sign-in', options)
      .then(data => {
        if (!data.ok) {
          throw new ClientError(data.status, data.statusText);
        }
        return data.json();
      })
      .then(result => {
        form.reset();
        this.setState({
          errMessage: false,
          loginSuccess: true
        });
      })
      .catch(err => {
        this.setState({
          errMessage: true,
          loginSuccess: false
        });
        console.error(err);
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
    if (route.path === 'sign-up') {
      return <SignUpForm handleSignUp={this.handleSignUp} />;
    }
    if (route.path === 'sign-in') {
      return <SignInForm handleSignIn={this.handleSignIn} errMessage={this.state.errMessage} loginSuccess={this.state.loginSuccess}/>;
    }
  }

  render() {
    return (
      <div>
        <AppContext.Provider value={{ route: this.state.route }}>
          <Navbar route={this.state.route} resetSearch={this.resetSearch} />
          { this.renderPage() }
        </AppContext.Provider>
      </div>
    );
  }
}
