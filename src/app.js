/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');
var Accesl = require('ui/accel');
var Vibe = require('ui/vibe');

var cityName = 'Orlando';
var myAPIKey = 'caaf81a949398c16c9f8931faba0562e';
var URL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=' + myAPIKey;

var parseFeed = function(data, quantity) {
      var items = [];
      for(var i = 0; i < quantity; i++) {
//         always uppercase the description string
        var title = data.list[i].weather[0].main;
        title = title.charAt(0).toUpperCase() + title.substring(1);
            
//         get data/time substring
        var time = data.list[i].dt_txt;
        time = time.substring(time.indexOf('-') + 1, time.indexOf(':') + 3);
        
//         add to menu items array
        items.push({
          title: title,
          subtitle: time
        });
      }
//       return whole array
      return items;
    };
// show splash screen while waiting for data
var splashWindow = new UI.Window();

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

// make the request to openweathermap.org
ajax(
  {
    url: URL,
    type: 'json'
  },
  function(data){
   
//   create an array of menu items
    var menuItems = parseFeed(data, 10);
    
//   check the items are extracted correctly
    for (var i = 0; i < menuItems.length; i++) {
      console.log(menuItems[i].title + ' | ' + menuItems[i].subtitle);
    }
//     construct menu to show to user
    var resultsMenu = new UI.Menu({
      sections: [{
        title: 'Current Forecast',
        items: menuItems
      }]
    });
//      show the menu, hide the splash
    resultsMenu.show();
    splashWindow.hide();
    
//     register for 'tap' events
    resultsMenu.on('accelTap', function(e){
//       make another request to openweathermap.org
      ajax(
      {
        url: URL,
        type: 'json'
      },
        function(data){
//       create an array of menu items
          var newItems = parseFeed(data, 10);
          
//       update the menu's first section
          resultsMenu.items(0, newItems);
          
//       notify the user
          Vibe.vibrate('short');
        },
        function(error){
          console.log('Download failed: ' + error);  
        }
      );
    });
  },
  function(error) {
    console.log('Download failed: ' + error);
  }
);
