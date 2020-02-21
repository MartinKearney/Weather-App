import React from 'react';

import CurrentWeather from './CurrentWeather';
import FiveDay from './FiveDay';

import './Weather.css';

const Weather = ({ city, currentData, fiveDay }) => {
  const { name, state, country } = city;
  return (
    <div>
      <p>
        Showing weather for {name} - {state}
        {state === '' ? '' : ', '}
        {country}
      </p>
      <CurrentWeather data={currentData} />
      <p>--------------------------------</p>
      <FiveDay data={fiveDay} />
    </div>
  );
};

export default Weather;
