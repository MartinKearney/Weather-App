import React from 'react';

import {
  icons,
  round,
  fahrToCels,
  degToDirection,
  getHourTime,
  getIconId,
  // capitalizeFirstLetter,
} from '../../utils/helpers';

import './CurrentWeather.css';

const CurrentWeather = ({ data }) => {
  const { main, weather, wind, dt, timezone } = data;

  // const summary = capitalizeFirstLetter(weather[0].description);
  const iconId = getIconId(weather[0].icon);
  const currentTemp = round(fahrToCels(main.temp));
  const currentWindSpeed = round(wind.speed);
  const currentWindDirection = degToDirection(wind.deg);
  const currentHumidity = Math.round(main.humidity);
  const currentPressure = Math.round(main.pressure);
  const currentTimeStamp = dt + timezone;

  // create date object from time stamp
  const dateObj = new Date(currentTimeStamp * 1000);
  const utcString = dateObj.toUTCString();

  // take 12th and 11th last characters of string to get hour in 24hr clock
  const hourString = utcString.slice(-12, -10);
  // convert to integer
  const obsHour24 = parseInt(hourString);

  // convert to 12 hour time
  const obsHour = getHourTime(obsHour24);

  // Get day of latest observation
  const dayOfObs = utcString.slice(0, 3);

  // Get source of icon to display
  let iconSrc;
  for (let i = 0; i < icons.length; i++) {
    if (icons[i].id === iconId) {
      iconSrc = icons[i].src;
      break;
    }
  }

  return (
    <div className='current-weather'>
      <div className='current-weather__sub'>
        <p>
          <strong>
            &#40;Observed: {dayOfObs} {obsHour}&#41;
          </strong>
        </p>
      </div>
      <div className='current-weather__display'>
        <img src={iconSrc} alt={weather[0].description} />
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
