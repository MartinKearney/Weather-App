import React, { useState } from 'react';

import './SearchComponent.css';

const SearchComponent = ({ getCitySearchResults, resetState }) => {
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
    if (e.target.value === '') {
      resetState();
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (text) {
      resetState();
      const city = text;
      getCitySearchResults(city);
    }
  };

  const clearSearch = () => {
    setText('');
    resetState();
  };

  return (
    <div className='search-component'>
      <form className='form'>
        <input
          className='search-field'
          type='text'
          name='text'
          placeholder='Search Locations...'
          value={text}
          onChange={onChange}
          autoFocus
        />
        <section className='buttons'>
          <button className='search-button' onClick={handleSearch}>
            Search
          </button>
          <button className='clear' onClick={clearSearch} disabled={!text}>
            Clear
          </button>
        </section>
      </form>
    </div>
  );
};

export default SearchComponent;
