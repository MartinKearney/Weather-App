import React from 'react';

import './ChoiceItem.css';

const ChoiceItem = ({ city, selectCity }) => {
  const { name, state, country } = city;
  const handleClick = () => {
    selectCity(city);
  };

  return (
    <div className='choice-item'>
      <p onClick={handleClick} city={city}>
        {name} - {state}
        {state === '' ? '' : ','} {country}
      </p>
    </div>
  );
};

export default ChoiceItem;
