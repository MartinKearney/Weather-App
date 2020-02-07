import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchComponent from './components/search/SearchComponent';
import Spinner from './components/utils/Spinner';
import Results from './components/display/Results';
import ChoiceList from './components/display/ChoiceList';

import './App.css';

const App = () => {
  // set up state using useState hook
  const [citySearchedFor, setCitySearchedFor] = useState('');
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [cityResults, setCityResults] = useState([]);
  const [duplicateCountryCodes, setDuplicateCountryCodes] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState([]);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);

  const getCitySearchResults = async cityName => {
    console.log(`Searching for: ${cityName}`);
    const searchResults = await axios.get(`/findcities/${cityName}`);
    console.log(searchResults);

    if (searchResults.data === 'No Results') {
      setNoResults(true);
      setCityResults([]);
      setDuplicateCountryCodes([]);
    } else {
      setCityResults(searchResults.data[0]);
      setDuplicateCountryCodes(searchResults.data[1]);
    }

    // logs results to console
    // console.log(cityResults);
    // console.log(duplicateCountryCodes);
    // console.log(cityResults.length);
    // console.log(duplicateCountryCodes.length);
  };

  const handleClear = () => {
    setCityResults([]);
    setDuplicateCountryCodes([]);
    setNoResults(false);
  };

  useEffect(() => {
    console.log('Use Effect');
  });

  return (
    <div className='App'>
      <header className='header'>Weather Search</header>
      <SearchComponent
        getCitySearchResults={getCitySearchResults}
        handleClear={handleClear}
      />
      <Results
        cities={cityResults}
        dups={duplicateCountryCodes}
        noResults={noResults}
      />
    </div>
  );
};

export default App;
