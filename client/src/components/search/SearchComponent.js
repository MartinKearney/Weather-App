import React, { useState } from 'react';

import './SearchComponent.css';

const SearchComponent = ({ getCitySearchResults, handleClear }) => {
  const [text, setText] = useState('');

  const onChange = e => {
    setText(e.target.value);
    if (e.target.value === '') {
      handleClear();
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    const city = text;
    getCitySearchResults(city);
  };

  const clearSearch = () => {
    setText('');
    handleClear();
  };

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          className='search-field'
          type='text'
          // name matches the state item
          name='text'
          placeholder='Search Locations...'
          value={text}
          onChange={onChange}
        />
        <input
          className='search-button'
          type='submit'
          value='Search'
          // className='btn btn-dark btn-block'
        />
        <button className='clear' onClick={clearSearch} disabled={!text}>
          Clear
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;
