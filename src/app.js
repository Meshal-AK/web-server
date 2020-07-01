const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weathe App",
    name: "Misha",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About O",
    name: "Misha",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help",
    name: "Misha",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  address = req.query.address;

  geoCode(address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error, { message }) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        address,
        location,
        weather: message,
      });
    });
  });

  // res.send({
  //   address: req.query.address,
  // });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term" });
  }
  res.send({ products: [] });
});

// app.get("/help/*", (req, res) => {
//   res.send("Help article not found");
// });

// app.get("*", (req, res) => {
//   res.send("404 Page");
// });

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Misha",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Misha",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => console.log(`Server is up on port ${port}.`));
