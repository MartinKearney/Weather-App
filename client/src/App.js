import React, { useState } from 'react';
import axios from 'axios';

import SearchComponent from './components/search/SearchComponent';
import Spinner from './components/utils/Spinner';
import ChoiceList from './components/display/ChoiceList';
import Weather from './components/display/weather/Weather';

import './App.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [citySearchedFor, setCitySearchedFor] = useState('');
  const [searchComplete, setSearchComplete] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [tooManyResults, setTooManyResults] = useState(false);
  const [citySearchResults, setCitySearchResults] = useState([]);
  const [finalChoiceList, setFinalChoiceList] = useState([]);
  const [showChoiceList, setShowChoiceList] = useState(false);
  const [selectedCity, setSelectedCity] = useState([]);
  const [getWeather, setGetWeather] = useState(false);
  const [currentWeather, setCurrentWeather] = useState([]);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);

  const getCitySearchResults = async (cityName) => {
    setLoading(true);
    const searchResults = await axios.get(`/findcities/${cityName}`);
    // Update state
    setCitySearchedFor(cityName);
    if (searchResults.data === 'No Results') {
      setNoResults(true);
      setCitySearchResults([]);
    } else if (searchResults.data === 'Too Many') {
      setTooManyResults(true);
      setCitySearchResults([]);
    } else {
      setNoResults(false);
      setCitySearchResults(searchResults.data);
    }

    setSearchComplete(true);
  };

  const getChoiceList = async (cities) => {
    // clear this state here to stop continual searching as
    // this function is called every render if 'true'
    setSearchComplete(false);

    // set up empty array for results
    let tempResults = [];

    for (let i = 0; i < cities.length; i++) {
      const latitude = cities[i].coord.lat;
      const longitude = cities[i].coord.lon;
      const result = await axios.get(
        `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${process.env.REACT_APP_DH_KEY}&mode=retrieveAddresses&prox=${latitude},${longitude},250`
      );

      // Add appropriate data to tempResults array
      tempResults[i] = {
        id: cities[i].id,
        name: cities[i].name,
        state: '',
        country:
          result.data.Response.View[0].Result[0].Location.Address
            .AdditionalData[0].value,
      };
      // some states are undefined (e.g. for Curacao!) so add appropriately
      if (
        result.data.Response.View[0].Result[0].Location.Address
          .AdditionalData[1]
      ) {
        tempResults[i].state =
          result.data.Response.View[0].Result[0].Location.Address.AdditionalData[1].value;
      }
      // set county as state for uk locations providing one exists
      if (
        tempResults[i].country === 'United Kingdom' &&
        result.data.Response.View[0].Result[0].Location.Address
          .AdditionalData[2]
      ) {
        tempResults[i].state =
          result.data.Response.View[0].Result[0].Location.Address.AdditionalData[2].value;
      }
      // remove state if city name is the same as it
      if (tempResults[i].name === tempResults[i].state) {
        tempResults[i].state = '';
      }
      // remove state if it's the same as the country
      if (tempResults[i].country === tempResults[i].state) {
        tempResults[i].state = '';
      }
    }

    // Now want to split into 3 arrays:
    // 1. UK results matching exactly
    // 2. Rest of world matching exactly
    // 3. Partial matches from anywhere
    let ukExact = [];
    let restOfWorldExact = [];
    let partialMatches = [];

    if (tempResults[0] !== undefined) {
      tempResults.forEach((city) => {
        if (
          city.country === 'United Kingdom' &&
          city.name.toUpperCase() === citySearchedFor.toUpperCase()
        ) {
          ukExact.push(city);
        } else if (city.name.toUpperCase() === citySearchedFor.toUpperCase()) {
          restOfWorldExact.push(city);
        } else {
          partialMatches.push(city);
        }
      });
    }

    // Sorting function
    const citySort = (inputArray) => {
      // eslint-disable-next-line
      inputArray.sort((city1, city2) => {
        // First sort alphabetically by country
        if (city1.country > city2.country) return 1;
        if (city1.country < city2.country) return -1;
        // then sort by state if it exists
        if (city1.state !== '' && city2.state !== '') {
          if (city1.state > city2.state) return 1;
          if (city1.state < city2.state) return -1;
        }
      });
    };

    // Now sort each of the three sub arrays
    citySort(ukExact);
    citySort(restOfWorldExact);
    citySort(partialMatches);

    // Now merge back together again
    let tempResults2 = [...ukExact, ...restOfWorldExact, ...partialMatches];

    // Now remove duplicates i.e. those with same state and country or those
    // whose city name due to partial matching is equal to the name of
    // the searched for city's state
    // set up new temporary array
    let tempResults3 = [];
    // No checking required if fewer than 2 cities found
    if (tempResults2.length < 2) {
      tempResults3.push(tempResults2[0]);
    } else {
      let duplicateIndices = [];
      for (let i = 0; i < tempResults2.length - 1; i++) {
        for (let j = i + 1; j < tempResults2.length; j++) {
          if (
            tempResults2[i].country === tempResults2[j].country &&
            (tempResults2[i].state === tempResults2[j].state ||
              tempResults2[i].state === tempResults2[j].name)
          ) {
            duplicateIndices.push(j);
          }
        }
      }
      // Now populate array with all original results except
      // for those at any index in duplicateIndices
      for (let i = 0; i < tempResults2.length; i++) {
        if (!duplicateIndices.includes(i)) {
          tempResults3.push(tempResults2[i]);
        }
      }
    }

    // update the state
    setFinalChoiceList(tempResults3);
    setLoading(false);
    setShowChoiceList(true);
  };

  const selectCity = (city) => {
    // first hide the list of choices
    setShowChoiceList(false);

    // set the selected city
    setSelectedCity(city);

    // set flag to get the weather
    setGetWeather(true);
  };

  const getCurrentWeather = async (city) => {
    // reset this to false to prevent repeated calls to api as
    // function is called every render if getWeather is 'true'
    setGetWeather(false);

    const current = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?id=${city.id}&units=Imperial&APPID=${process.env.REACT_APP_OWM_KEY}`
    );

    setCurrentWeather(current.data);

    // Now get five day forecast data
    getFiveDayForecast(city.id);
  };

  const getFiveDayForecast = async (id) => {
    const fiveDay = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?id=${id}&units=Imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    );

    setFiveDayForecast(fiveDay.data);
  };

  const resetState = () => {
    // this function is passed to the SearchComponent
    setLoading(false);
    setSearchComplete(false);
    setCitySearchedFor('');
    setNoResults(false);
    setTooManyResults(false);
    setCitySearchResults([]);
    setFinalChoiceList([]);
    setShowChoiceList(false);
    setSelectedCity([]);
    setCurrentWeather([]);
    setFiveDayForecast([]);
    setGetWeather(false);
  };

  // call getChoiceList if a search has been completed
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
        getCitySearchResults={getCitySearchResults}
        resetState={resetState}
      />

      {loading && <Spinner />}

      {showChoiceList && (
        <ChoiceList
          city={citySearchedFor}
          cities={finalChoiceList}
          noResults={noResults}
          tooManyResults={tooManyResults}
          selectCity={selectCity}
        />
      )}
      {selectedCity.length !== 0 &&
        currentWeather.length !== 0 &&
        fiveDayForecast.length !== 0 && (
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
