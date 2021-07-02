//Importing libraries
const { default: axios } = require("axios");
const express = require("express");
const app = express();

//Import API key from env libraries
OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

//Setting the express middleware
app.use(express.json());

app.use(express.static("public"));

//Post handler
app.post("/weather", (req, res) => {
  const city = req.body.city;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHERMAP_API_KEY}`;

  axios
    .get(url)
    .then((data) => res.json(data.data))
    .catch((err) => console.log(err.message));
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
