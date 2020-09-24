// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData


d3.json("/api/v1.0/canada_covid").then(function(data){
   for (var i = 0; i < data.length; i++){
     console.log(data[i].latitude, data[i].longitude)
   }
  })


d3.json("/api/v1.0/covid_trends").then(function (data) {

  var bikeArray = [];
  var cerbArray = [];
  var maskArray = [];
  var patioArray = [];
  var zoomArray = [];
  var dailyCasesArray = [];
  var dateArray = [];

  for (var i = 0; i < data.length; i++) {

    bikeArray.push(data[i].Bike);
    cerbArray.push(data[i].CERB);
    maskArray.push(data[i].Mask);
    patioArray.push(data[i].Patio);
    zoomArray.push(data[i].Zoom);
    dailyCasesArray.push(data[i].daily_cases);
    dateArray.push(data[i].date);
  }

  //console.log(bikeArray);
  //console.log(dateArray);

  var trace1 = {
    x: dateArray,
    y: dailyCasesArray,
    name: 'Daily Cases',
    type: 'scatter'
  };

  var trace2 = {
    x: dateArray,
    y: bikeArray,
    name: '"Bike" Google Search',
    yaxis: 'y2',
    type: 'scatter'
  };

  var data = [trace1, trace2];

  var layout = {
    title: 'Google Search Trends',
    yaxis: { title: 'Daily Cases' },
    yaxis2: {
      title: 'Bike Search',
      titlefont: { color: 'rgb(148, 103, 189)' },
      tickfont: { color: 'rgb(148, 103, 189)' },
      overlaying: 'y',
      side: 'right'
    }
  };

  Plotly.newPlot('trendsDiv', data, layout);
});  
