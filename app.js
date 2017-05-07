const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

var app = express();

console.log("we out here");

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));


app.get('/', (req, res) => {
  // res.render('home.hbs', {
  //   welcomeMessage: "Welcome to the Weather App! To check the weather, enter any location!"
  // });
  res.sendFile(__dirname + '/views/home.html');
});

app.get('/weather', (req, res) => {
  console.log(req.query);
  // res.json([{"id": 1, "name": "Ben"}]);
  // console.log("weather req");
  geocode.geocodeAddress(req.query.loc, (errMessage, result) => {
    if (errMessage) {
      console.log(errMessage);
    } else {
      console.log(result.address);
      console.log("coords retrieved");
      weather.getWeather(result.latitude, result.longitude, (errorMessage, weatherResults) => {
        if (errorMessage) {
          console.log(errorMessage);
        } else {
          // console.log(`It is currently ${weatherResults.currently.temperature}. It feels like ${weatherResults.currently.apparentTemperature}`);
          res.json({temperature: weatherResults.currently.temperature});
        }
      });


    }
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
// const argv = yargs
//   .options({
//     a: {
//       demand: true,
//       alias: 'address',
//       describe: 'Address to fetch weather for',
//       string: true
//     }
//   })
//   .help()
//   .alias('help', 'h')
//   .argv;
//
// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//   if (errorMessage) {
//     console.log(errorMessage);
//   } else {
//
//     console.log(results.address);
    // weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
    //   if (errorMessage) {
    //     console.log(errorMessage);
    //   } else {
    //     console.log(`It is currently ${weatherResults.currently.temperature}. It feels like ${weatherResults.currently.apparentTemperature}`);
    //   }
    // });
//   }
// });

// lat, lng, callback


// eb97c0fa087490a63aa36b59c0c70080
//https://api.darksky.net/forecast/eb97c0fa087490a63aa36b59c0c70080/34.1487141,-118.3608046
