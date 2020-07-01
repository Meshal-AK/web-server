const request = require("postman-request");

const forecast = (lat, lon, callback) => {
  const weatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=cccc4a0daa453d3c8b0bf08f2120d03f`;

  request({ url: weatherURL, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to weather services!");
    } else if (body.cod === 404 || body.cod === 400) {
      body;
      callback("Unable to find location!");
    } else {
      callback(undefined, {
        message:
          body.weather[0].description +
          ". It is currently " +
          body.main.temp +
          ". It feels like " +
          body.main.feels_like,

        description: body.weather[0].description,
        temp: body.main.temp,
        feels_like: body.main.feels_like,
      });
    }
  });
};

module.exports = forecast;
