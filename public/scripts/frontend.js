(function () {
'use strict';

console.log("Starting up...");

angular.module('WeatherApp', [])
.controller('WeatherController', WeatherController)
.service('GetWeatherService', GetWeatherService);

WeatherController.$inject = ['GetWeatherService', '$http', '$scope'];
function WeatherController (GetWeatherService, $http, $scope) {
  var wCtrl = this;

  wCtrl.getWeather = () => {
    console.log("Getting weather");
    console.log("Loc:", wCtrl.locString);
    $http({
      method: 'GET',
      url: '/weather',
      params: { loc: wCtrl.locString }
    }).then((res) => {
      wCtrl.temp = res.data.temperature;
    });
  }
}

GetWeatherService.$inject = ['$http'];
function GetWeatherService ($http) {

}

})();
