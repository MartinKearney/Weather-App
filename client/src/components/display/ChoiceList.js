import React from 'react';

import ChoiceItem from './ChoiceItem';

import './ChoiceList.css';

const ChoiceList = ({
  city,
  cities,
  noResults,
  tooManyResults,
  selectCity,
}) => {
  const totalResults = cities.length;

  if (noResults) {
    return (
      <div className='choice-list'>
        <div className='choice-list__header'>
          <p>No results found for "{city}"</p>
        </div>
      </div>
    );
  } else if (tooManyResults) {
    return (
      <div className='choice-list'>
        <div className='choice-list__header'>
          <p>Too many results found for "{city}"</p>
          <p>Please be more specific with your search</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className='choice-list'>
        <div className='choice-list__header'>
          <p>
            Found {totalResults} result{totalResults > 1 ? 's' : null} for "
            {city}"
          </p>
        </div>
        <div className='choice-list__list'>
          {cities.map((city, idx) => (
            <ChoiceItem key={idx} city={city} selectCity={selectCity} />
          ))}
        </div>
      </div>
    );
  }
};

export default ChoiceList;
