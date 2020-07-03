# Weather App

This application can be viewed live at https://upper-bunnyhug-64871.herokuapp.com

To run in development mode:
(N.B. you will need your own API keys from Open Weather Map and HERE Developer)

1. Clone or download the project to your machine
2. At a terminal prompt, in the root of the project, enter `npm install`
3. Create a blank `.env` file in the client folder
4. In this file set `REACT_APP_OWM_KEY` and `REACT_APP_DH_KEY` accordingly.
5. Finally, at the terminal, in the project root, enter `npm run dev`

<p>The application uses Open Weather Map's city list json file on the backend.  When the user
searches for a location this file is searched for matches on a starts-with basis.  The resulting
matches are then each passed to HERE Developer API in order to get more precise location information.
An apparent limitation of relying solely on Open Weather Map is that it is not possible to get state
or county infromation about a location.  For example, searching for 'Aberdeen' using only Open Weather
Map returns several which are in the USA, with no way of distinguishing between them.  By using the
reverse geocoding API provided by HERE Developer it has been possible to attain this much needed extra
information and thus present the user with a suitably informative list of search results.  Once a selection
is made the Open Weather Map API is then queried using the desired location's unique id and the user is
presented with the forecast details: both the most recent current weather obseravtion and a 5 day
forecast consisting of 40 forecast items separated at 3-hour intervals.</p>

Technologies Used:

- React
- Node.js

Dependencies:

- express
- axios

Development Dependencies:

- nodemon
- concurrently
