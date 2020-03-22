const API_KEY = "pk.eyJ1Ijoic3JhaXNpYW4iLCJhIjoiY2s3cnA4bmF6MDhmaDNmcHVobDg5dm1tMiJ9.GJtgeuU6cInhwKgYBwr6Mw";

// Store our API endpoint inside queryUrl
//var dataLink = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Creating map object
var myMap = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 4
  });
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.pirates",
    accessToken: API_KEY
}).addTo(myMap);

// Load in geojson data
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var geojson;

//get data from d3
d3.json(geoData, function(data) {
    //console.log(data);//print data
   //make cirlceMarkers for mag data
    L.geoJSON(data, {
        pointToLayer: function (feature, location) {
          return L.circleMarker(location, {
            radius: markerSize(feature.properties.mag),
            fillColor: colorRange(feature.properties.mag),
            color: "black",
            weight: 0.5,
            opacity: 0.5,
            fillOpacity: 0.75
            });
        },
        //have bindPopups with location, mag, time data
        onEachFeature: function(feature, layer) {
            layer.bindPopup(
                "Location: " +
                    feature.properties.place +
                    "<br>Magnitute: " +
                    feature.properties.mag + 
                    "<br> Date: "+
                    new Date(feature.properties.time)
            );
          }
    
      }).addTo(myMap);//add to the map!

  });

//color function to put in circleMarker
function colorRange(magnituge) {
    switch (true) {
      case magnituge >= 5.0:
        return 'red';
        break;
      case magnituge >= 4.0:
        return 'orangered';
        break;
      case magnituge >= 3.0:
        return 'orange';
        break;
      case magnituge >= 2.0:
        return 'gold';
        break;
      case magnituge >= 1.0:
        return 'yellow';
        break;
      default:
        return 'greenyellow';
  };
};
  
  // Scale Marker Size for circleMarker
function markerSize(magnituge) {
    return magnituge*6;
};
  