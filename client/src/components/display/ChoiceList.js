import React from 'react';

import ChoiceItem from './ChoiceItem';

const ChoiceList = ({ city, cities, noResults, selectCity }) => {
  // console.log('Hello from choice list');
  // console.log(cities);
  const totalResults = cities.length;

  if (noResults) {
    return (
      <div>
        <p>No results found for "{city}"</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>
          Found {totalResults} result{totalResults > 1 ? 's' : null} for "{city}
          "
        </p>
        {cities.map((city, idx) => (
          <ChoiceItem key={idx} city={city} selectCity={selectCity} />
        ))}
      </div>
    );
  }
};

export default ChoiceList;
