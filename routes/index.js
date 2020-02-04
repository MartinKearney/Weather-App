const express = require('express');
const compare = require('case-insensitive-compare');
const router = express.Router();

const cityListObject = require('../city-list.json');
const cityList = cityListObject.cities;

// @route       GET /:city
// @desc        Return array of matching cities
router.get('/:city', async (req, res) => {
  try {
    console.log(`City searched for: ${req.params.city}`);

    // filter city list for matches
    const foundCities = cityList.filter(elt =>
      compare(elt.name, req.params.city)
    );

    // send response
    res.json(foundCities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error!' });
  }
});

module.exports = router;
