const express = require('express');
const router = express.Router();

const cityListObject = require('../city-list.json');
const cityList = cityListObject.cities;

const resultsLimit = 50;

// @route       GET /:city
// @desc        Return array of matching cities
router.get('/:city', async (req, res) => {
  try {
    console.log(`City searched for: ${req.params.city}`);
    // filter city list for matches
    // criteria: exact match, or city in db starts with the city searched
    // for and the next chracater of the city in the db is not a letter
    // so 'nagoya' will find a match in 'Nagoya-shi' but 'Pari' will not
    // match with 'Paris' - though letters with diacritics slip through :(
    const foundCities = cityList.filter((elt) => {
      if (elt.name.length === req.params.city.length) {
        return elt.name.toUpperCase() === req.params.city.toUpperCase();
      } else if (elt.name.length > req.params.city.length) {
        if (elt.name.toUpperCase().startsWith(req.params.city.toUpperCase())) {
          if (elt.name.charCodeAt(req.params.city.length) < 65) {
            return true;
          } else if (elt.name.charCodeAt(req.params.city.length) > 122) {
            return true;
          } else if (
            elt.name.charCodeAt(req.params.city.length) > 90 &&
            elt.name.charCodeAt(req.params.city.length) < 97
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
    console.log(foundCities.length);
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
