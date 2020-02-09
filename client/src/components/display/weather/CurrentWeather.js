import React from 'react';

import { round, fahrToCels, degToDirection } from '../../utils/helpers';

const CurrentWeather = ({ data }) => {
  console.log(data);

  const { name, sys, main, weather, wind } = data;

  return <div>Current</div>;
};

export default CurrentWeather;
