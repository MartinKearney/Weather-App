import React from 'react';

const ChoiceItem = ({ city, selectCity }) => {
  const handleClick = () => {
    selectCity(city);
  };

  return (
    <div>
      <p onClick={handleClick} city={city}>
        {city.name} - {city.state}, {city.country}
      </p>
    </div>
  );
};

export default ChoiceItem;
