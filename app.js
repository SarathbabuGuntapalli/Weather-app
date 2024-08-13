const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const location = req.body.cityName;
  const apiKey = "2d98bc3d72b1e099b71dd7fae038601d";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&appid=" +
    apiKey +
    "&units=metric";
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const disc = weatherData.weather[0].description;

      res.write(
        "<h1>The temperature in " + location + " is " + temp + "degree cel</h1>"
      );
      res.write("<p>weather description:" + disc + "</p>");
    });
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on the ${PORT}`);
});
