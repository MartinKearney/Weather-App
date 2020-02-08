import React from 'react';

import ChoiceItem from './ChoiceItem';

const ChoiceList = ({ cities, selectCity }) => {
  console.log('Hello from choice list');
  console.log(cities);
  return (
    <div>
      <p>Choice List</p>
      {cities.map((city, idx) => (
        <ChoiceItem key={idx} city={city} selectCity={selectCity} />
      ))}
    </div>
  );
};

export default ChoiceList;
