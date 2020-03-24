import React from 'react';

import {
  round,
  fahrToCels,
  degToDirection,
  getWeekday,
  getHourTime12
} from '../../utils/helpers';

const CurrentWeather = ({ data }) => {
  console.log(data);

  const { name, sys, main, weather, wind, dt } = data;

  const summary = weather[0].description;
  const currentTemp = round(fahrToCels(main.temp), 1);
  const currentWindSpeed = round(wind.speed, 1);
  const currentWindDirection = degToDirection(wind.deg);

  console.log('Temp: ' + currentTemp);

  // console.log('Day: ' + getWeekday(dt));
  // console.log('Time: ' + getHourTime12(dt));
  // console.log(new Date(dt));

  return (
    <div>
      <p>Current</p>
      <p>{summary}</p>
      <p>Temp: {currentTemp}&#176;C</p>
      <p>
        Wind: {currentWindSpeed} mph {currentWindDirection}
      </p>
    </div>
  );
};

export default CurrentWeather;
