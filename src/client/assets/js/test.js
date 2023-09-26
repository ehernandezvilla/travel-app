
const trip = document.getElementById('save_trip');
const text_apiGeo = document.getElementById('api-geo'); 
const text_apiWeather = document.getElementById('api-weather');
trip.addEventListener('click', function (event) { 
    console.log('trip saved');
    text_apiGeo.innerText = 'API Geo OK!'
    text_apiWeather.innerText = 'API Weather OK!'
});



// Path: travel-app/src/client/assets/js/test.js

