
/* Button handler function */

// document.getElementById('city-btn').addEventListener('click', handleButtonClick);

function handleButtonClick() {
    let destination = document.querySelector('#city').value;
    

    if (!destination.trim()) {
        alert('Please enter a valid destination');
        return;
    }

    console.log('Information sent to the server!');

    const apiEndpoint = 'http://localhost:8080/getGeonames';

    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({destination: destination}) // Añadido el cuerpo de la solicitud
    })
    .then(res => res.json())
    .then(data => {
        if (data.error){
            throw new Error(data.error);
        }
        // console.log(data);


        // Trip info general data
        const tripInfoElement = document.getElementById('api-coci');
        tripInfoElement.innerText = `The information for your trip to ${data.city_name}, ${data.country_name} is`;

        // Update the image 
        const imageUrl = data.imageURL;
        const imageElement = document.getElementById('img').querySelector('img');
        imageElement.src = imageUrl;

        // Update the weather data in the HTML
        const weatherElement = document.getElementById('api-weather');
        weatherElement.innerHTML = `Temperature: ${data.temperature}°C \n Mostly ${data.weatherDescription} during the day`;
    })
    .catch(error => console.error('There was a problem with the fetch operation', error));
}

// export { handleButtonClick}


/* Form handler */

document.querySelector('form').addEventListener('submit', handleSubmit);


function handleSubmit(e) {
    e.preventDefault(); // Prevents the page from reloading

    //Capture the data from the text and date inputs
    const currentDate = new Date();
    const destination = document.getElementById('POST-name').value;
    const departureDateStr = document.getElementById('POST-date').value;

    // Print the inputted info in the console
    console.log(`Destination: ${destination} \n Departure date: ${departureDateStr}`);
    
    // Convert the departureData to string to a Date object
    const departureDate = new Date(departureDateStr);

    // Calculate the days to the trip
    const DatesDiff = (departureDate - currentDate);
    const daysToTrip = Math.ceil(DatesDiff / (1000 * 60 * 60 * 24));

    // console.log(`Days to trip: ${daysToTrip}`);

    // Check if the inputted data is valid
    if (destination.trim() === '' || departureDateStr.trim() === '') {
        alert('Please enter a valid destination and date');
        return;
    }

    console.log('Form submitted!')

    const apiEndpoint = 'http://localhost:8080/getGeonames';

    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({destination: destination, departureDate: departureDate})
    })
    .then(res => res.json())
    .then(data => {
        if (data.error){
            throw new Error(data.error);
        }
        
        //Trip info general data
        console.log(data);
        const travelSearch = document.getElementById('travel-search');
        travelSearch.innerHTML = `${data.city_name}, ${data.country_name}`;
        const tripInfoElement = document.getElementById('api-coci');
        tripInfoElement.innerText = `Your trip to ${data.city_name}, ${data.country_name} is ${daysToTrip} days away.`;

        //Update the image
        const imageUrl = data.imageURL;
        const imageElement = document.getElementById('img').querySelector('img');
        imageElement.src = imageUrl;

        // Update the weather data in the HTML

        const weatherElement = document.getElementById('api-weather');  
        weatherElement.innerHTML = `Temperature: ${data.temperature}°C \n Mostly ${data.weatherDescription} during the day`;

        // Other relevant information
        const otherInfo = document.querySelector('#other-info');
        otherInfo.innerText = `The languages are ${data.languageNames} and the capital is ${data.countryCapital}.\n The population is ${data.countryPopulation}.\n The timezones are ${data.countryTimezones}.\n`;


        // Flag item

        const flagElement = document.createElement('img'); 
        flagElement.src = data.countryFlags;
        flagElement.alt = 'Flag';
        flagElement.id = 'myFlag';
        // console.log(data.countryMaps)
        
        

        // Map item

        const linkElement = document.createElement('a');
        linkElement.href = data.countryMaps;
        linkElement.target = '_blank';
        
        // Adding link
        linkElement.appendChild(flagElement);

        // Adding to parent 
        const parentDiv = document.getElementById('other-info');
        parentDiv.appendChild(linkElement);



        // Information to save 

        const tripSave = document.getElementById('save-input');
        tripSave.innerText = `${data.city_name}, ${data.country_name}: ${daysToTrip} days away. Projected  temperature ${data.temperature}°C mostly ${data.weatherDescription} during the day. The languages are ${data.languageNames} and the capital is ${data.countryCapital}.\n`;

    })
    .catch(error => console.error('There was a problem with the fetch operation', error));
}











