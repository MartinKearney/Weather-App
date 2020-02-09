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
  const [cityResults, setCityResults] = useState([]);
  const [duplicateCountryCodes, setDuplicateCountryCodes] = useState([]);
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
      setDuplicateCountryCodes([]);
    } else {
      setNoResults(false);
      setCityResults(searchResults.data[0]);
      setDuplicateCountryCodes(searchResults.data[1]);
    }
  };

  const getChoiceList = async (cities, duplicates) => {
    // go through each city - if it's country is in the duplicates
    // list then call the api with the city's lat & lon and extract
    // the principal subdivision and append it to the list
    for (let i = 0; i < cities.length; i++) {
      // check for city being in a country with other
      // cities of the same name
      if (duplicates.includes(cities[i].country)) {
        // contact api
        // first get coords of city
        const lat = cities[i].coord.lat;
        const lon = cities[i].coord.lon;
        // make call
        const result = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
        );
        // append part of result to country
        if (result.data.principalSubdivision) {
          cities[i].country =
            result.data.principalSubdivision + ', ' + cities[i].country;
        }
        // cities[i].subDiv = result.data.principalSubdivision;

        console.log(result);
      }
    }
    // now want to remove any items that have the same
    // country as another item and what about sorting the
    // list based on country and is there an api to
    // convert country codes to names?
    // ***save for later***
    console.log('Bonjour');
    console.log(cities);
    console.log(duplicates);
    // update the state
    setFinalList(cities);
  };

  const selectCity = city => {
    console.log(`Chosen city: ${city.name} - ${city.country} - id: ${city.id}`);
    // *** got correct city here - now want to set the appropriate state
    // call the api to get the current weather and conditionally render ***
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
    setDuplicateCountryCodes([]);
    setNoResults(false);
    setFinalList([]);
    setCurrentWeather([]);
    setCountry('');
    setFiveDayForecast([]);
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
        getChoiceList={getChoiceList}
      />
      {finalList.length !== 0 && (
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
