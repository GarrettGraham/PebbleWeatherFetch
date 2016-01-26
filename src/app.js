/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');

// BEGIN: using window object (instead of card) to display weather forecast data
// note: windows allow for me to place UI elements anywhere I'd like

var Vector2 = require('vector2');

// show splash screen while waiting for data
var splashWindow = new UI.window();

// text element to inform the user
var text = new UI.Text({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  text: 'Downloading weather data...',
  font: 'GOTHIC_28_BOLD',
  color: 'black',
  textOverflow: 'wrap',
  textAlign: 'center',
  backgroundColor: 'white'
});

// Add to splashWindow and show
splashWindow.add(text);
splashWindow.show();

var cityName = 'Orlando';
var myAPIKey = 'caaf81a949398c16c9f8931faba0562e';
var URL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + myAPIKey;

// make the request to openweathermap.org
ajax(
  {
    url: URL,
    type: 'json'
  },
  function(data){
    
  },
  function(error) {
    console.log('Download failed: ' + error);
  }
);

// END: window object displaying weather forecast


// BEGIN: showing wather data for just one city
// create a card with title and subtitle
// var card = new UI.Card({
//   title: 'Weather',
//   subtitle: 'Fetching...'
// });

// // display the card
// card.show();

// // construct url for the ajax call
// var cityName = 'Orlando';
// var myAPIKey = 'caaf81a949398c16c9f8931faba0562e';
// var URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + myAPIKey;

// // make the request to the api
// ajax(
// {
//   url: URL,
//   type: 'json'
// },
// function(data) {
// //   success
//   console.log('Successfully fetched weather data!');
  
// //   extract data and adjust temp from Kelvin to Celcius
//   var location = data.name;
//   var temperature = Math.round(data.main.temp - 273.15) + 'C';
  
// //   always upper-case first letter of description
//   var description = data.weather[0].description;
//   description = description.charAt(0).toUpperCase() + description.substring(1);

// //   show data to user by accessing card object
//   card.subtitle(location + ', ' + temperature);
//   card.body(description);
// },
// function(error) {
// //   failure
//   console.log('Failed fetching weather data: ' + error);
// }
// );
// END: showing wather data for just one city