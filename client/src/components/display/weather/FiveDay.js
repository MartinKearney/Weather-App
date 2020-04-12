import React from 'react';

import './FiveDay.css';

import {
  round,
  fahrToCels,
  degToDirection,
  getHourTime,
  getNextDay,
} from '../../utils/helpers';

const FiveDay = ({ data }) => {
  console.log(data);
  const { city, list } = data;
  const timezone = city.timezone;

  // Need to determine how many separate days
  // the five day forecast will encompass

  // First get timestamp for first five day forecast item
  const currentTimeStamp = list[0].dt + timezone;

  // create date object from time stamp
  const dateObj = new Date(currentTimeStamp * 1000);
  const utcString = dateObj.toUTCString();
  console.log(utcString);

  // Extract first hour from string
  const firstHourString = utcString.slice(-12, -10);
  const firstHour = parseInt(firstHourString);

  // If the hour string is 0, 1 or 2 then we have a
  // span of five days, otherwise we have six
  const fiveDaySpan = firstHour === 0 || firstHour === 1 || firstHour === 2;
  let span = 5;
  if (!fiveDaySpan) {
    span = 6;
  }
  console.log(span + ' days');
  console.log('First hour ' + firstHour);

  // Want day of first forecast item
  const firstDay = utcString.slice(0, 3);
  console.log('First day ' + firstDay);
  // let nextDay = getNextDay(firstDay);
  // console.log(nextDay);

  // Now set up array of day names for labels
  let days = [];
  days.push(firstDay);
  for (let i = 0; i < span - 1; i++) {
    days.push(getNextDay(days[i]));
  }
  console.log(days);

  //******************************
  return (
    <div className='five-day'>
      <div className='five-day__side-labels'>
        <label id='0'>{days[0]}</label>
        <label id='1'>{days[1]}</label>
        <label id='2'>{days[2]}</label>
        <label id='3'>{days[3]}</label>
        <label id='4'>{days[4]}</label>
        {!fiveDaySpan ? <label id='5'>{days[5]}</label> : null}
      </div>
      <div className='five-day__weather-display'>
        <div className='five-day__weather-display-day'></div>
      </div>
    </div>
  );
};

export default FiveDay;
