import React from 'react';

import {
  round,
  fahrToCels,
  degToDirection,
  getWeekday,
  getHourTime,
  capitalizeFirstLetter,
} from '../../utils/helpers';

import './CurrentWeather.css';

const CurrentWeather = ({ data }) => {
  console.log(data);

  const { name, sys, main, weather, wind, dt, timezone } = data;

  const summary = capitalizeFirstLetter(weather[0].description);
  const currentTemp = round(fahrToCels(main.temp));
  const currentWindSpeed = round(wind.speed);
  const currentWindDirection = degToDirection(wind.deg);
  const currentHumidity = Math.round(main.humidity);
  const currentPressure = Math.round(main.pressure);
  const currentTimeStamp = dt + timezone;
  // console.log(currentTimeStamp);

  // create date object from time stamp
  const dateObj = new Date(currentTimeStamp * 1000);
  const utcString = dateObj.toUTCString();
  // console.log(utcString);
  // take 12th and 11th last characters of string to get hour in 24hr clock
  const hourString = utcString.slice(-12, -10);
  // convert to integer
  const obsHour24 = parseInt(hourString);
  // console.log(obsHour24);
  // convert to 12 hour time

  const obsHour = getHourTime(obsHour24);

  // let obsHour;
  // if (obsHour24 > 12) {
  //   obsHour = obsHour24 - 12 + 'pm';
  // } else if (obsHour24 === 12) {
  //   obsHour = '12pm';
  // } else if (obsHour24 === 0) {
  //   obsHour = '12am';
  // } else {
  //   obsHour = obsHour24 + 'am';
  // }

  // Get day of latest observation
  const dayOfObs = utcString.slice(0, 3);
  // console.log(obsHour);

  return (
    <div className='current-weather'>
      <div className='current-weather__sub'>
        <p>
          &#40;Observed: {dayOfObs} {obsHour}&#41;
        </p>
      </div>

      <div className='current-weather__display'>
        <img
          src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt='{weather[0].description}'
        />
        {/* <p>{summary}</p> */}

        <ul>
          <li>
            <strong>Temp</strong>: {currentTemp}&#176; C
          </li>
          <li>
            <strong>Wind</strong>: {currentWindSpeed} mph {currentWindDirection}
          </li>
          <li>
            <strong>Humidity</strong>: {currentHumidity}%
          </li>
          <li>
            <strong>Pressure</strong>: {currentPressure}mb
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CurrentWeather;
