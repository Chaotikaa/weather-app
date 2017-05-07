const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/eb97c0fa087490a63aa36b59c0c70080/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // console.log(body.currently.temperature);
      callback(undefined, body);
    } else {
      // console.log('Unable to fetch weather.');
      callback('Unable to fetch weather.');
    }
  });
}



module.exports.getWeather = getWeather;
