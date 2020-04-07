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

  const onSubmit = (e) => {
    if (text) {
      e.preventDefault();
      // clearForNewSearch();
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
        <section className='buttons'>
          <input
            className='search-button'
            type='submit'
            value='Search'
            // className='btn btn-dark btn-block'
          />
          <button className='clear' onClick={clearSearch} disabled={!text}>
            Clear
          </button>
        </section>
      </form>
    </div>
  );
};

export default SearchComponent;
