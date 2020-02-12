import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchComponent from './components/search/SearchComponent';
import Spinner from './components/utils/Spinner';
import Results from './components/display/Results';
import ChoiceList from './components/display/ChoiceList';
import Weather from './components/display/weather/Weather';

import './App.css';

const App = () => {
  // set up state using useState hook
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [hideResults, setHideResults] = useState(false);
  const [cityResults, setCityResults] = useState([]);
  const [finalList, setFinalList] = useState([]);
  const [country, setCountry] = useState('');
  const [currentWeather, setCurrentWeather] = useState([]);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);

  const getCitySearchResults = async cityName => {
    console.log(`Searching for: ${cityName}`);
    const searchResults = await axios.get(`/findcities/${cityName}`);
    console.log(searchResults);

    if (searchResults.data === 'No Results') {
      setNoResults(true);
      setCityResults([]);
    } else {
      setNoResults(false);
      setCityResults(searchResults.data);
    }
  };

  const getChoiceList = async cities => {
    // set up empty array for results
    let tempResults = [];

    for (let i = 0; i < cities.length; i++) {
      console.log(cities[i]);
      const latitude = cities[i].coord.lat;
      const longitude = cities[i].coord.lon;
      const result = await axios.get(
        `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${process.env.REACT_APP_DEVHERE_KEY}&mode=retrieveAddresses&prox=${latitude},${longitude},250`
      );

      // Add appropriate data to tempResults array
      tempResults[i] = {
        id: cities[i].id,
        name: cities[i].name,
        state:
          result.data.Response.View[0].Result[0].Location.Address
            .AdditionalData[1].value,
        country:
          result.data.Response.View[0].Result[0].Location.Address
            .AdditionalData[0].value
      };
    }
    // update the state
    setFinalList(tempResults);
  };

  const selectCity = city => {
    console.log(`Chosen city: ${city.name} - ${city.country} - id: ${city.id}`);
    // *** got correct city here - now want to set the appropriate state
    // call the api to get the current weather and conditionally render ***
    // first hide results
    setHideResults(true);
    getCurrentWeather(city.id, city.country);
  };

  const getCurrentWeather = async (id, country) => {
    const current = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?id=${id}&units=Imperial&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
    );
    console.log(current.data);
    setCurrentWeather(current.data);
    setCountry(country);

    // Now get five day forecast data
    getFiveDayForecast(id);
  };

  const getFiveDayForecast = async id => {
    const fiveDay = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?id=${id}&units=Imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    );
    console.log(fiveDay.data);
    setFiveDayForecast(fiveDay.data);
  };

  const handleClear = () => {
    setCityResults([]);
    // setDuplicateCountryCodes([]);
    setNoResults(false);
    setFinalList([]);
    setCurrentWeather([]);
    setCountry('');
    setFiveDayForecast([]);
    setHideResults(false);
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
      {!hideResults && (
        <Results
          cities={cityResults}
          noResults={noResults}
          getChoiceList={getChoiceList}
        />
      )}
      {finalList.length !== 0 && !hideResults && (
        <ChoiceList cities={finalList} selectCity={selectCity} />
      )}
      {currentWeather.length !== 0 &&
        country !== '' &&
        fiveDayForecast.length !== 0 && (
          <Weather
            currentData={currentWeather}
            country={country}
            fiveDay={fiveDayForecast}
          />
        )}
    </div>
  );
};

export default App;
