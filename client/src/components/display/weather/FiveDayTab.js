import React from 'react';

import FiveDayTabItem from './FiveDayTabItem';

import './FiveDayTab.css';

const FiveDayTab = ({ data }) => {
  console.log(data);

  // want to return 8 FiveDayTabItems
  return (
    <div className='five-day-tab'>
      <FiveDayTabItem data={data[0]} />
      <FiveDayTabItem data={data[1]} />
      <FiveDayTabItem data={data[2]} />
      <FiveDayTabItem data={data[3]} />
      <FiveDayTabItem data={data[4]} />
      <FiveDayTabItem data={data[5]} />
      <FiveDayTabItem data={data[6]} />
      <FiveDayTabItem data={data[7]} />
    </div>
  );
};

export default FiveDayTab;
