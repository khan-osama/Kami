import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: []
    };
    this.getScheduleAnime = this.getScheduleAnime.bind(this);
  }

  render() {
    const { schedule } = this.state;
    const daysOfWeek = ['Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays', 'Sundays'];

    if (this.state.schedule.length === 0) {
      return (
        <Spinner className='loading' animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }
    return (
      <div className='schedule-container'>
        <div className="container schedule-page">
          <div className="row">
            <div className="col-sm">
              <div className='sch-link'>
                <h1>Schedule</h1>
              </div>
            </div>
          </div>
          {daysOfWeek.map((days, index) => {
            return (
              <div key={days} className="row week-row">
                <h1 className='weekday'>{days}</h1>
                  {schedule.filter(anime => anime.broadcast.day === days).map((obj, index) => {
                    return (
                        <div key={obj.title} className='col-sm schedule-anime'>
                              <img className='schedule-anime-img' src={`${obj.images.jpg.image_url}`}></img>
                              <a href={'#details?animeId=' + obj.mal_id} className='schedule-anime-title'>{obj.title}</a>
                        </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getScheduleAnime();
  }

  getScheduleAnime() {
    const scheduleRequests = Array(3).fill().reduce((previous, _, index) => {
      const pageNum = index + 1;
      return previous.then(schedule => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            fetch(`https://api.jikan.moe/v4/seasons/now?page=${pageNum}`)
              .then(res => res.json())
              .then(page => resolve(page));
          }, 800);
        }).then(nextPage => schedule.concat(nextPage.data));
      });
    }, Promise.resolve([]));

    scheduleRequests
      .then(schedule => this.setState({ schedule }));
  }
}
