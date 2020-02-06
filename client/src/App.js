import React, { useState } from 'react';

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

  return (
    <div className='App'>
      <header className='header'>Weather Search</header>
    </div>
  );
};

export default App;
