const fetch = require('node-fetch');
require('dotenv').config();

const apiKey = `${process.env.API_KEY}&units=metric`;

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;
// Setup Server
const server = app.listen(port, listening);
function listening(){
    console.log(`running on localhost: ${port}`);
};

// All routes 

// GET route /all example

app.get('/all', sendData);

function sendData (request, response){
response.send('Welcome to the Weather Journal App Project!');
};

// POST route 

weatherData = [];

app.post('/weather', addWeather);

function addWeather(req, res) {
    const newEntry = {
        temperature: req.body.temperature, // Openweather API
        date: req.body.date, // Openweather API
        feelings: req.body.feelings // Capture the feeling of the user 
    }
    weatherData.push(newEntry);
    console.log(weatherData);
    res.json({ success: true, message: "Data added successfully!", data: weatherData });
}

// GET route /weather

app.get('/weather', (req, res) => {
    res.json(weatherData);
});

app.get('/fetchWeather/:zip', async (req, res) => {
    const zipCode = req.params.zip;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;
    
    try {
        const apiResponse = await fetch(apiUrl);
        const data = await apiResponse.json();
        res.send(data);
    } catch (error) {
        console.log("error", error);
        res.status(500).send(error);
    }
});






