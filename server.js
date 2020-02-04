const express = require('express');
const path = require('path');

const app = express();

// Enable acceptance of json into API
// ** check if this is needed **
app.use(express.json({ extended: false }));

// Define API end point
app.use('/', require('./routes/index'));

// The envirnoment variable will be used in production
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
