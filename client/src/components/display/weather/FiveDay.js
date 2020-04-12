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
  console.log(fiveDaySpan);
  console.log(firstHour);

  // Want day of first forecast item
  const firstDay = utcString.slice(0, 3);
  console.log(firstDay);
  let nextDay = getNextDay(firstDay);
  console.log(nextDay);

  // Now set up arrays for each day represented

  //******************************
  return <div className='five-day'>5 day</div>;
};

export default FiveDay;
