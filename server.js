const express = require('express');
const path = require('path');

const app = express();

// Enable acceptance of json into API
app.use(express.json({ extended: false }));

// Define API end point
app.use('/findcities/', require('./routes/index'));

// Serve static assets in production i.e. React
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  // Set catch all route
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

// The envirnoment variable will be used in production
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
