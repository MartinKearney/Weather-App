import React from 'react';

const Results = ({ cities, dups, noResults, getChoiceList }) => {
  console.log(cities);
  console.log(dups);

  // Return msg to show no results were found
  if (noResults) {
    return (
      <div>
        <p>No Results Found</p>
      </div>
    );
  }
  if (cities.length !== 0 && dups.length !== 0) {
    if (cities[0].name === dups[0]) {
      console.log('Match');
      getChoiceList(cities, dups);
      return (
        <div>
          <p>Showing results for {cities[0].name}</p>
        </div>
      );
    } else {
      return null;
    }
  } else {
    return (
      <div>
        <p>Nothing to see, folks</p>
      </div>
    );
  }
};

export default Results;
