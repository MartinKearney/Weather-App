import React from 'react';

import './FiveDayTabItem.css';

const FiveDayTabItem = ({ data }) => {
  console.log(data);
  if (data.time === 99) {
    return <div className='tab-item__empty'></div>;
  }

  return (
    <div className='tab-item__item'>
      <p className='tab-item__head'>{data.time}</p>
      <img
        src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt='Weather Icon'
      />
      <p>Temp: {data.temp}&#176; C</p>
      <p>Wind: {data.wind}</p>
    </div>
  );
};

export default FiveDayTabItem;
