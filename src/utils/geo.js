const request = require("request");

const geo = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYXphdHJ1bSIsImEiOiJja3NxamtkNjIwY2x6MnVvMzEwZmdwcmE4In0.5Q40gA8UwlaQBSPBlY7hNA`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback({
        error:
          "There might be an issue on your end. Please check your internet connection",
      });
    } else if (response.body.features.length === 0) {
      callback({ error: "Error! cannot find, Please try again" });
    } else {
      callback({
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geo;
