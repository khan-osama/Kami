import React from 'react';

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
                <h1>{days}</h1>
                  {schedule.filter(anime => anime.broadcast.day === days).map((obj, index) => {
                    return (
                        <div key={obj.title} className='col-sm schedule-anime'>
                              <img className='top-anime-img' src={`${obj.images.jpg.image_url}`}></img>
                              <h4 className='top-anime-title'>{obj.title}</h4>
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
    let pageNum = 1;
    const dataArr = [];
    setTimeout(() => {
      for (let i = 0; i < 2; i++) {
        fetch(`https://api.jikan.moe/v4/seasons/now?page=${pageNum}`)
          .then(data => {
            return data.json();
          })
          .then(anime => {
            dataArr.push(anime.data);
            this.setState({
              schedule: dataArr.flat()
            });
          });
        pageNum++;
      }
    }, 2000);
  }
}
