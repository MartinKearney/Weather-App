import React from 'react';

import FiveDayTab from './FiveDayTab';

import './FiveDay.css';

import {
  round,
  fahrToCels,
  degToDirection,
  getHourTime,
  getNextDay,
  setFiveDayObject,
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

  // Now set up array of day names for tab labels
  let days = [];
  days.push(firstDay);
  for (let i = 0; i < span - 1; i++) {
    days.push(getNextDay(days[i]));
  }
  console.log(days);

  // Now set up the 5 or 6 arrays to hold the weather
  // data for each particular day.
  // First set an array to hold all the weather items
  // this array will either stay at size 40 or go to 48
  // in either case it will be split into blocks of 8
  // depending on the span
  const fiveDayArray = [];

  // Now get the 40 weather items
  let timeStamp = firstHour - 3;
  for (let i = 0; i < 40; i++) {
    timeStamp += 3;
    if (timeStamp > 23) {
      timeStamp -= 24;
    }
    let time = getHourTime(timeStamp);
    let temp = round(fahrToCels(list[i].main.temp), 1);
    let icon = list[i].weather[0].icon;
    let windSpeed = round(list[i].wind.speed, 1);
    let windDir = degToDirection(list[i].wind.deg);
    let wind = `${windSpeed} mph ${windDir}`;
    // make an object from desired data above
    // and push to array
    fiveDayArray.push(setFiveDayObject(time, icon, temp, wind));
  }

  // Now, for a span of 6, need to determine how many empty
  // objects to insert at the beginning and end of the array
  if (span === 6) {
    const before = Math.floor(firstHour / 3);
    const after = 8 - before;
    // create empty object
    const dummy = { time: 99 };
    // add dummies to front
    for (let i = 0; i < before; i++) {
      fiveDayArray.unshift(dummy);
    }
    // add dummies to back
    for (let i = 0; i < after; i++) {
      fiveDayArray.push(dummy);
    }
  }

  console.log(fiveDayArray);
  // Now split array into blocks of 8
  const day1 = fiveDayArray.slice(0, 8);
  const day2 = fiveDayArray.slice(8, 16);
  const day3 = fiveDayArray.slice(16, 24);
  const day4 = fiveDayArray.slice(24, 32);
  const day5 = fiveDayArray.slice(32, 40);
  let day6 = [];
  if (span === 6) {
    day6 = fiveDayArray.slice(40);
  }

  console.log(day1);
  console.log(day2);
  console.log(day3);
  console.log(day4);
  console.log(day5);
  console.log(day6);

  // click handler for labels
  const openDay = (e) => {
    console.log(e.target.innerHTML);
    const dayName = e.target.innerHTML;

    // Get all elements with class="tabcontent" and hide them
    const tabcontent = document.getElementsByClassName('tabcontent');
    console.log(tabcontent);
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }

    // Get all elements with class="tablink" and remove the class "active"
    const tablinks = document.getElementsByClassName('tablink');
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(dayName).style.display = 'block';
    e.currentTarget.className += ' active';
  };

  //******************************
  return (
    <div className='five-day'>
      <div className='five-day__side-labels'>
        <label className='tablink active' onClick={openDay}>
          {days[0]}
        </label>
        <label className='tablink' onClick={openDay}>
          {days[1]}
        </label>
        <label className='tablink' onClick={openDay}>
          {days[2]}
        </label>
        <label className='tablink' onClick={openDay}>
          {days[3]}
        </label>
        <label className='tablink' onClick={openDay}>
          {days[4]}
        </label>
        {!fiveDaySpan ? (
          <label className='tablink' onClick={openDay}>
            {days[5]}
          </label>
        ) : null}
      </div>
      <div className='five-day__weather-display'>
        <div id={days[0]} className='tabcontent' style={{ display: 'block' }}>
          <FiveDayTab data={day1} />
        </div>
        <div id={days[1]} className='tabcontent'>
          <FiveDayTab data={day2} />
        </div>
        <div id={days[2]} className='tabcontent'>
          <FiveDayTab data={day3} />
        </div>
        <div id={days[3]} className='tabcontent'>
          <FiveDayTab data={day4} />
        </div>
        <div id={days[4]} className='tabcontent'>
          <FiveDayTab data={day5} />
        </div>
        {span === 6 ? (
          <div id={days[5]} className='tabcontent'>
            <FiveDayTab data={day6} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FiveDay;
