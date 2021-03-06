const request = require("postman-request");

const geoCode = (address, callback) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYWNjZXdvb2QiLCJhIjoiY2tiemRwd2dpMThlMjJzbGc0aWowenZ4eCJ9.pYLfuwykvhEGmTSupD4omw&limit=1`;

  request({ url: geocodeURL, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to location services!");
    } else if (body.features.length === 0) {
      callback("Unable to find location!");
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
