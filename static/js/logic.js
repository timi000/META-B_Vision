var myMap = L.map("map", {
  center: [60.59, -99.3468],
  zoom: 3
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Use this link to get the geojson data.
var link = "../static/data/canada.geojson";

// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "blue",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillOpacity: 0.3,
        weight: 2
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.8
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.NAME + "</h1> <hr> <h2>" + feature.properties.NAME + "</h2>");

    }
  }).addTo(myMap);
});

//Total Recovered Marker on each province and territory 




// Markers 

// var markers = L.markerClusterGroup();


//   Set the data location property to a variable
// var filteredData = data.filter(function (d) {
//   return d.province_name != "Canada" && d.province_name != "Repatriated travellers";
// });

// var filteredDate = [filteredData[i].latitude, filteredData[i].longitude];

//   Check for location property
//   if (location) {

//     Add a new marker to the cluster group and bind a pop-up
//     markers.addLayer(L.marker([location])
//       .bindPopup(response[i].province_name));

// Add our marker cluster layer to the map
// myMap.addLayer(markers);

// }};

// click event that triggers the popup and centres it on the polygon
// layer.on("click", function (e) {
//   var bounds = layer.getBounds();
//   var popupContent = "popup content here";
//   popup.setLatLng(bounds.getCenter());
//   popup.setContent(popupContent);
//   map.openPopup(popup)