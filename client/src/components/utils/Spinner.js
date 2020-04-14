import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      alt='Loading...'
      style={{
        width: '5%',
        margin: '0 auto',
        display: 'block',
        border: 'none',
        background: '#e0ffff',
      }}
    />
  </Fragment>
);

export default Spinner;
