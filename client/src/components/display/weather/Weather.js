import React from 'react';

import CurrentWeather from './CurrentWeather';
import FiveDay from './FiveDay';

import './Weather.css';

const Weather = ({ currentData, country, fiveDay }) => {
  return (
    <div>
      <p>
        The is Weather for {currentData.name} - {country}
      </p>
      <CurrentWeather data={currentData} />
      <p>--------------------------------</p>
      <FiveDay data={fiveDay} />
    </div>
  );
};

export default Weather;
