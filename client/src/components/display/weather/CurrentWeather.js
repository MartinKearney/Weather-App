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

  // console.log('Day: ' + getWeekday(dt));
  // console.log('Time: ' + getHourTime12(dt));
  // console.log(new Date(dt));

  return <div>Current</div>;
};

export default CurrentWeather;
