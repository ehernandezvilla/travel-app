const fetch = require('node-fetch');
require('dotenv').config();


const PIXABAY_API = `${process.env.PIXABAY_API}`;
const WEATHERBIT_API = `${process.env.WEATHERBIT_API}`;
const GEONAMES_USERNAME = `${process.env.GEONAMES_USERNAME}`;
const GEONAMES_URL = `http://api.geonames.org/searchJSON?maxRows=1`



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
app.use(cors({
    origin: '*' // All the origins
}));

// Initialize the main project folder
app.use(express.static('website'));

const port = 8080;
// Setup Server
const server = app.listen(port, listening);
function listening() {
    console.log(`running on localhost: ${port}`);
};

// Endpoints 

// GET route /all

app.get('/all', sendData);
function sendData(request, response) {
    response.send('Welcome to the travel app project!');
};

// POST Test 

// app.post('/test', async (req, res) => {
//     try {
//         const formValue = req.body.destination;
//         const [city, country] = req.body.destination.split(',');
//         console.log(city, country);
//         // console.log(formValue.split(','));
//         res.json({message: 'Success!', data: formValue});
//     }
//     catch {
//         console.log('error', error);
//         res.status(500).send(error);
//     }
// });

// GET getGeonames


app.post('/getGeonames', async (req, res) => {
    try {
        const [city, country] = req.body.destination.split(',');
        const apiResponse = await fetch(`${GEONAMES_URL}&name_startsWith=${city}&country=${country}&username=${GEONAMES_USERNAME}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!apiResponse.ok) {
            throw new Error(`HTTP error! status: ${apiResponse.status}`);
        }

        const data = await apiResponse.json();
        console.log(data)
        const toponymName = data.geonames[0].toponymName;
        const countryName = data.geonames[0].countryName;
        const lat = data.geonames[0].lat;
        const long = data.geonames[0].lng;
        const city_name = data.geonames[0].name;
        const country_name = data.geonames[0].countryName;

        // console.log(lat, long); // debug lat, long

        // Solicitud a Pixabay

        const PIXABAY_API = `${process.env.PIXABAY_API}`;
        const PIXABAY_URL = `https://pixabay.com/api/?key=${PIXABAY_API}&q=${toponymName},%20${countryName}&image_type=photo&pretty=true&order=popular&per_page=3`;

        const pixabayResponse = await fetch(PIXABAY_URL);

        if (!pixabayResponse.ok) {
            const errorMessage = await pixabayResponse.text();
            console.error(`Error from Pixabay: ${errorMessage}`);
            throw new Error(`Error from Pixabay: ${errorMessage}`);
        }

        const pixabayData = await pixabayResponse.json();
        // console.log(pixabayData) // Respuesta completa de Pixabay
        // Primera imagen de la respuesta > LargeURL
        const imageURL = pixabayData.hits[0].largeImageURL;

        // Solicitud a Weatherbit

        const WEATHERBIT_URL = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=${WEATHERBIT_API}&include=minutely`

        const weatherbitResponse = await fetch(WEATHERBIT_URL);

        if (!weatherbitResponse.ok) {
            const errorMessage = await weatherbitResponse.text();
            console.error(`Error from Weatherbit: ${errorMessage}`);
            throw new Error(`Error from Weatherbit: ${errorMessage}`);
        }

        const weatherbitData = await weatherbitResponse.json();
        const temp = weatherbitData.data[0].temp;
        const weatherDescription = weatherbitData.data[0].weather.description;

        // Solicitud a REST Countries

        const RESTCOUNTRIES_URL = `https://restcountries.com/v3.1/name/${country_name}`
        console.log(country_name)
        const restcountriesResponse = await fetch(RESTCOUNTRIES_URL);

        if (!restcountriesResponse.ok) {
            const errorMessage = await restcountriesResponse.text();
            console.error(`Error from REST Countries: ${errorMessage}`);
            throw new Error(`Error from REST Countries: ${errorMessage}`);
        }

        const restcountriesData = await restcountriesResponse.json();
        console.log(restcountriesData)

        // console.log(temp); // debug temp
        // console.log(weatherbitData); // debug weatherDescription

        res.json({
            message: 'Success!',
            city_name: city_name,
            country_name: country_name,
            imageURL: imageURL,
            temperature: temp,
            weatherDescription: weatherDescription,
        });

    } catch (error) {
        console.error(`Could not fetch data: ${error}`);
        res.status(500).json({ error: 'Server Error' });
    }
});







