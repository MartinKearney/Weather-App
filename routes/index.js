const express = require('express');
const router = express.Router();

const cityListObject = require('../city-list.json');
const cityList = cityListObject.cities;

const resultsLimit = 40;

// @route       GET /:city
// @desc        Return array of matching cities
router.get('/:city', async (req, res) => {
  try {
    console.log(`City searched for: ${req.params.city}`);
    // filter city list for matches
    const foundCities = cityList.filter(
      // elt => compare(elt.name, req.params.city)
      (elt) => elt.name.toUpperCase().startsWith(req.params.city.toUpperCase())
    );
    if (foundCities.length > resultsLimit) {
      console.log(`Too Many: ${foundCities.length}`);
      res.json('Too Many');
    }
    // catch the case of no results here
    else if (foundCities.length === 0) {
      res.json('No Results');
    } else {
      res.json(foundCities);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error!' });
  }
});

module.exports = router;
