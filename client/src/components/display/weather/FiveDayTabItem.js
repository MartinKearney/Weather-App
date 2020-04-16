import React from 'react';

import { icons, getIconId } from '../../utils/helpers';

import './FiveDayTabItem.css';

const FiveDayTabItem = ({ data }) => {
  const iconId = getIconId(data.icon);

  // Get source of icon to display
  let iconSrc;
  for (let i = 0; i < icons.length; i++) {
    if (icons[i].id === iconId) {
      iconSrc = icons[i].src;
      break;
    }
  }

  if (data.time === 99) {
    return <div className='tab-item__empty'></div>;
  }

  return (
    <div className='tab-item__item'>
      <p className='tab-item__head'>
        <strong>{data.time}</strong>
      </p>
      <img src={iconSrc} alt='Weather Icon' />
      <p>
        <strong>Temp</strong>: {data.temp}&#176; C
      </p>
      <p>
        <strong>Wind</strong>: {data.wind}
      </p>
    </div>
  );
};

export default FiveDayTabItem;
