import React from 'react';

import './Weather.css';

import { round, fahrToCels, degToDirection } from '../../utils/helpers';

const Weather = ({ currentData, country, fiveDay }) => {
  console.log(currentData);
  console.log(fiveDay);
  const { name, sys, main, weather, wind } = currentData;

  return (
    <div>
      <p>
        The is Weather for {name} - {country}
      </p>
    </div>
  );
};

export default Weather;
