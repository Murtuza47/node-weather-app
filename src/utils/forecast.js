const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8500a48543a9f029db570069ec1539a4`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback({
        error:
          "There might be an issue on your end. Please check your internet connection",
      });
    } else if (body.message) {
      callback({ error: "Error! cannot find, Please try again" });
    } else {
      callback({
        response: `
          There are ${body.weather[0].description}, temprature is ${body.main.temp} and wind speed is ${body.wind.speed}, so you can go out and enjoy yourself.
        `,
      });
    }
  });
};

module.exports = forecast;
