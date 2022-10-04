const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})



app.post("/", function(req, res) {
  console.log(req.body.cityName);
  const cityName = req.body.cityName

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=2de13f261063524ce323161031673265&units=metric"
  https.get(url, function(response) {

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      res.write("The tempature in "+cityName+" is " + temperature + " Degree Celsius.");
      res.write("The weather description is " + description + ".");
      res.send();
    });
  });
})




app.listen(3000, function(request, response) {
  console.log("The server is running at port 3000");
})
