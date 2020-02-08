import React from 'react';

const ChoiceItem = ({ city, selectCity }) => {
  let country = city.country;
  if (country === 'GB') {
    city.country = 'UK';
  }
  const handleClick = () => {
    // selectCity(name, country, id);
    selectCity(city);
  };
  //   name={name} country={country} id={id}

  return (
    <div>
      <p onClick={handleClick} city={city}>
        {city.name} - {city.country}
      </p>
    </div>
  );
};

export default ChoiceItem;
