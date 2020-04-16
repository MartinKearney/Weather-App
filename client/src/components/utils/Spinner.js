import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      alt='Loading...'
      style={{
        // width: '10%',
        minWidth: '4rem',
        maxWidth: '8rem',
        margin: '5% auto 0',
        display: 'block',
        border: 'none',
        background: 'none',
      }}
    />
  </Fragment>
);

export default Spinner;
