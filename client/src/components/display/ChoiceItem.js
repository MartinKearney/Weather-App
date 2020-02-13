import React from 'react';

const ChoiceItem = ({ city, selectCity }) => {
  const { name, state, country } = city;
  const handleClick = () => {
    selectCity(city);
  };

  return (
    <div>
      <p onClick={handleClick} city={city}>
        {name} - {state}
        {state === '' ? '' : ','} {country}
      </p>
    </div>
  );
};

export default ChoiceItem;
