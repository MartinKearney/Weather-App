import React from 'react';

import {
  round,
  fahrToCels,
  degToDirection,
  getWeekday,
  getHourTime12,
  capitalizeFirstLetter,
} from '../../utils/helpers';

import './CurrentWeather.css';

const CurrentWeather = ({ data }) => {
  console.log(data);

  const { name, sys, main, weather, wind, dt, timezone } = data;

  const summary = capitalizeFirstLetter(weather[0].description);
  const currentTemp = round(fahrToCels(main.temp), 1);
  const currentWindSpeed = round(wind.speed, 1);
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
  let obsHour;
  if (obsHour24 > 12) {
    obsHour = obsHour24 - 12 + 'pm';
  } else if (obsHour24 === 12) {
    obsHour = '12pm';
  } else if (obsHour24 === 0) {
    obsHour = '12am';
  } else {
    obsHour = obsHour24 + 'am';
  }

  // Get day of latest observation
  const dayOfObs = utcString.slice(0, 3);
  // console.log(obsHour);

  return (
    <div className='current-weather'>
      <div className='current-weather__display'>
        <div className='current-weather__display--image'>
          <img
            src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            alt='{weather[0].description}'
          />
          <p>{summary}</p>
        </div>
        <div className='current-weather__display--details'>
          <p>Temp: {currentTemp}&#176;C</p>
          <p>
            Wind: {currentWindSpeed} mph {currentWindDirection}
          </p>
          <p>Humidity: {currentHumidity}%</p>
          <p>Pressure: {currentPressure}mb</p>
        </div>
      </div>
      <div className='current-weather__sub'>
        <p>
          Observed: {dayOfObs} {obsHour}
        </p>
      </div>
    </div>
  );
};

export default CurrentWeather;
