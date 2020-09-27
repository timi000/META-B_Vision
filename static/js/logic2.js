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

  d3.json("/api/v1.0/canada_covid", function(data){
    //console.log(data)
    var filteredData = data.filter(function (d) {
      return d.province_name != "Canada" && d.province_name !=  "Repatriated travellers" && d.date=="18-09-2020";
    });
      var location =[];
      filteredData.forEach(fdata=>{
        fdata["Coordinate"]=[fdata.latitude, fdata.longitude]
      // })
    })
   console.log(filteredData)

  function markerSize(covid) {
      return (covid + 750) * 100;

  }

  for (var i = 0; i <filteredData.length; i++) {
      L.circle([filteredData[i].latitude, filteredData[i].longitude], {
          fillOpacity: 0.75,
          color: "blue",
          fillColor: "white",
          radius: markerSize(filteredData[i].active_cases)
      }).bindPopup("<h2>" + filteredData[i].province_name + "</h2>" + "<br>" + "<h1>" + filteredData[i].active_cases + "</h1>" ).addTo(myMap);
  }

// var bc = L.marker([filteredData[0].latitude, filteredData[0].longitude]).bindPopup("This is ON");
// var ab = L.marker([filteredData[4].latitude, filteredData[4].longitude]).bindPopup("This is ON");

// var jurisdictions = L.layerGroup([bc, ab]);


//     var baseMaps = {
//     "Grayscale": grayscale,
//      "Streets": streets
//     };
    
//     var overlayMaps = {
//     "Jurisdictions": jurisdictions
//     };
    
//     var myMap = L.map("map", {
//         center: [60.59, -99.3468],
//         zoom: 3,
//         layers: [grayscale, jurisdictions]
//       });

//     L.control.layers(baseMaps, overlayMaps).addTo(myMap);
  })

