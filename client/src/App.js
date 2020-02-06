import React, { useState } from 'react';
import axios from 'axios';

import SearchComponent from './components/search/SearchComponent';

import './App.css';

const App = () => {
  // set up state using useState hook
  const [citySearchedFor, setCitySearchedFor] = useState('');
  const [loading, setLoading] = useState(false);
  const [cityResults, setCityResults] = useState([]);
  const [duplicateCountryCodes, setDuplicateCountryCodes] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState([]);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);

  const getCityResultsList = async cityName => {
    setLoading(true);
    console.log(cityName);
    const searchResults = await axios.get(`/findcities/${cityName}`);

    // Apportion serach results to appropriate arrays
    setCityResults(cityResults.push(...searchResults.data[0]));
    setDuplicateCountryCodes(
      duplicateCountryCodes.push(...searchResults.data[1])
    );

    // log results to console
    console.log(cityResults);
    console.log(duplicateCountryCodes);
    setLoading(false);
  };

  return (
    <div className='App'>
      <header className='header'>Weather Search</header>
      <SearchComponent getCityResultsList={getCityResultsList} />
    </div>
  );
};

export default App;
