import React from 'react';

import './FiveDayTabItem.css';

const FiveDayTabItem = ({ data }) => {
  if (data.time === 99) {
    return <div className='tab-item empty'>Empty</div>;
  }

  return <div className='tab-item'>Weather</div>;
};

export default FiveDayTabItem;
