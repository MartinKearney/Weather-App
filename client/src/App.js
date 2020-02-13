import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchComponent from './components/search/SearchComponent';
import Spinner from './components/utils/Spinner';
import ChoiceList from './components/display/ChoiceList';
import Weather from './components/display/weather/Weather';

import './App.css';

const App = () => {
  // set up state using useState hook
  const [loading, setLoading] = useState(false);

  const [citySearchedFor, setCitySearchedFor] = useState('');
  const [searchComplete, setSearchComplete] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [citySearchResults, setCitySearchResults] = useState([]);
  const [finalChoiceList, setFinalChoiceList] = useState([]);
  const [showChoiceList, setShowChoiceList] = useState(false);
  const [selectedCity, setSelectedCity] = useState([]);
  const [getWeather, setGetWeather] = useState(false);
  const [currentWeather, setCurrentWeather] = useState([]);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);

  const getCitySearchResults = async cityName => {
    const searchResults = await axios.get(`/findcities/${cityName}`);
    // Update state
    setCitySearchedFor(cityName);
    if (searchResults.data === 'No Results') {
      setNoResults(true);
      setCitySearchResults([]);
    } else {
      setNoResults(false);
      setCitySearchResults(searchResults.data);
    }
    setSearchComplete(true);
  };

  const getChoiceList = async cities => {
    // clear this state here to stop continual searching as
    // this function is called every render if 'true'
    setSearchComplete(false);

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
      // set county for uk locations
      if (tempResults[i].country === 'United Kingdom') {
        tempResults[i].state =
          result.data.Response.View[0].Result[0].Location.Address.AdditionalData[2].value;
      }
      // remove state if city name is the same as it
      if (tempResults[i].name === tempResults[i].state) {
        tempResults[i].state = '';
      }
      console.log(tempResults[i]);
    }

    // ************************************************
    // still need to remove duplicates from tempResults
    // and order the results thereafter.
    // ************************************************

    // update the state
    setFinalChoiceList(tempResults);
    setShowChoiceList(true);
  };

  const selectCity = city => {
    // first hide the list of choice
    setShowChoiceList(false);

    // set the selected city
    setSelectedCity(city);

    // set flag to get the weather
    setGetWeather(true);
  };

  const getCurrentWeather = async city => {
    // reset this to false to prevent repeated calls to api as this function
    // is called every render if getWeather is 'true'
    setGetWeather(false);

    const current = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?id=${city.id}&units=Imperial&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
    );
    // console.log(current.data);
    setCurrentWeather(current.data);

    // Now get five day forecast data
    getFiveDayForecast(city.id);
  };

  const getFiveDayForecast = async id => {
    const fiveDay = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?id=${id}&units=Imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    );
    // console.log(fiveDay.data);
    setFiveDayForecast(fiveDay.data);
  };

  const clearForNewSearch = () => {
    // this is used in conjunction with the SearchComponent and ensures
    // that weather details relating to a previous search are not still
    // displayed in addition to the search results for a new search
    setSelectedCity([]);
  };

  const handleClear = () => {
    // this function is passed to the SearchComponent
    setSearchComplete(false);
    setCitySearchedFor('');
    setNoResults(false);
    setCitySearchResults([]);
    setFinalChoiceList([]);
    setShowChoiceList(false);
    setSelectedCity([]);
    setCurrentWeather([]);
    setFiveDayForecast([]);
    setGetWeather(false);
  };

  const logAllState = (location, start) => {
    let position;
    start ? (position = 'start') : (position = 'end');
    console.log(`---Showing state at ${position} of ${location}---`);
    console.log('citySearchedFor: ' + citySearchedFor);
    console.log('noResults: ' + noResults);
    console.log('citySearchResults: ' + citySearchResults);
    console.log('finalChoiceList: ' + finalChoiceList);
    console.log('showChoiceList: ' + showChoiceList);
    console.log('selectedCity: ' + selectedCity);
    console.log('currentWeather: ' + currentWeather);
    console.log('fiveDayForecast: ' + fiveDayForecast);
  };

  // log pre-render state
  // logAllState('pre-render', true);

  // call getChoiceList if we a search has been completed
  if (searchComplete) {
    getChoiceList(citySearchResults);
  }

  // call getCurrentWeather if ready
  if (getWeather) {
    getCurrentWeather(selectedCity);
  }

  return (
    <div className='App'>
      <header className='header'>Weather Search</header>
      <SearchComponent
        clearForNewSearch={clearForNewSearch}
        getCitySearchResults={getCitySearchResults}
        handleClear={handleClear}
      />

      {showChoiceList && (
        <ChoiceList
          city={citySearchedFor}
          cities={finalChoiceList}
          noResults={noResults}
          selectCity={selectCity}
        />
      )}
      {selectedCity.length !== 0 &&
        currentWeather.length !== 0 &&
        fiveDayForecast !== 0 && (
          <Weather
            city={selectedCity}
            currentData={currentWeather}
            fiveDay={fiveDayForecast}
          />
        )}
    </div>
  );
};

export default App;
