const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geo = require("./utils/geo");
const forecast = require("./utils/forecast");

const app = express();

//Define path for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsDirPath = path.join(__dirname, "../templates/views");
const partialDirPath = path.join(__dirname, "../templates/partials");

//Setip handlebars engine and views function
app.set("view engine", "hbs");
app.set("views", viewsDirPath);
hbs.registerPartials(partialDirPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ali Murtaza",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Ali Murtaza",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Ali Murtaza",
  });
});

app.get("/forecast", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "You must provide an address",
    });
  }
  geo(req.query.address, ({ longitude, latitude, location, error }) => {
    if (error) return res.send({ error });
    forecast(longitude, latitude, ({ error, response }) => {
      if (error) return res.send({ error });
      res.send({
        forecast: response,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(3000, () => {
  console.log("Server is up and runing");
});
