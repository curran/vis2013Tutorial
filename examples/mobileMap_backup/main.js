/**
 * This script implements the map visualization based on the 
 * HTML5 Geolocation API and OpenStreetMap.
 *
 * This script depends on osm.js, jQuery, Underscore and Leaflet.
 */
$(document).ready(function(){
  var map = L.map('map', {attributionControl: false}),
      tileLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
      localeZoomLevel = 16;
 
  // Generates the HTML in the marker popup.
  function genPopupHTML(d) {
    return d.tags.map( function (tag) {
      return tag.k + ': ' + tag.v;
    }).join('<br>');
  }

  // Zoom out to the whole world.    
  map.setView([0, 0], 1);
  
  // Add the OSM tile layer to the map.
  tileLayer.addTo(map);

  // Get the location of the user with the HTML5 Geolocation API.
  // See http://www.w3schools.com/html/html5_geolocation.asp
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude,
        lng = position.coords.longitude,
        minLat, minLng, maxLat, maxLng, bounds;

    map.setView([lat, lng], localeZoomLevel);
    
    $('#status').text('Querying OpenStreetMap ...');

    bounds = map.getBounds();

    minLat = bounds.getSouth();
    minLng = bounds.getWest();
    maxLat = bounds.getNorth()
    maxLng = bounds.getEast();

    osm.query(minLat, minLng, maxLat, maxLng, function (data) {
      data.forEach(function (d) {
        var marker = new L.CircleMarker([d.lat, d.lng]);
        marker.bindPopup(genPopupHTML(d));
        marker.addTo(map);
      });

      $('#statusContainer').attr('class', 'doneLoading');
    });
  });

  // Here's how you can respond to map movements:
  //map.on('move', function () {
  //  console.log(map.getZoom());
  //  console.log(map.getBounds());
  //});
});
