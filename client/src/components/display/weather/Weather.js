import React from 'react';

import CurrentWeather from './CurrentWeather';
import FiveDay from './FiveDay';

import './Weather.css';

const Weather = ({ city, currentData, fiveDay }) => {
  const { name, state, country } = city;
  return (
    <div className='weather'>
      <p>
        {name} - {state}
        {state === '' ? '' : ', '}
        {country}
      </p>
      <div className='weather-display'>
        <CurrentWeather data={currentData} />

        <FiveDay data={fiveDay} />
      </div>
    </div>
  );
};

export default Weather;
