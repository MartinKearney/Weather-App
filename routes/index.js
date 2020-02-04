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

    // form array of all country codes
    const countryCodes = foundCities.map(city => city.country);
    console.log(countryCodes);

    // array to hold only those country codes which are duplicated
    let duplicateCodes = [];

    for (i = 0; i < countryCodes.length - 1; i++) {
      console.log('');
      console.log(
        `Outer Loop: i = ${i} => seeking match for ${countryCodes[i]}`
      );
      // skip inner for loop if duplicates array already
      // contains the country code at index i of outer loop
      if (duplicateCodes.includes(countryCodes[i])) {
        console.log(`Match already found for ${countryCodes[i]}`);
        continue;
      }
      for (j = i + 1; j < countryCodes.length; j++) {
        console.log(`---Inner Loop: j = ${j} => found ${countryCodes[j]}`);
        if (countryCodes[i] === countryCodes[j]) {
          duplicateCodes.push(countryCodes[i]);
          console.log(`------Match found: i = ${i} and j = ${j}`);
          // don't need to check current index i against
          // remaining indices j so break to next value of i
          break;
        }
      }
    }

    // will keep these console logs in until testing is over
    console.log('');
    console.log(`Duplicate country codes: ${duplicateCodes}`);
    console.log('');
    console.log(duplicateCodes);
    console.log('');

    // want to send back the foundCities array
    // *and* the duplicateCodes array

    const returnData = [foundCities, duplicateCodes];

    // send response
    res.json(returnData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error!' });
  }
});

module.exports = router;
