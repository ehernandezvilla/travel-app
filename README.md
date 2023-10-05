# Travel App Project

## Overview

The Travel App project is a web application that allows users to plan their trips by providing information about the destination such as weather, images, and other relevant data.

## Features

- Search for a destination city and country.
- Retrieve and display images of the destination.
- Fetch and show the current weather of the destination.
- Provide additional information about the country like population, capital, and more.

## Technologies Used

- Node.js
- Express
- Fetch API
- Geonames API
- Weatherbit API
- Pixabay API
- REST Countries API

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js & npm](https://nodejs.org/en/download/)
- Other requisites are described in the package.json file

### Installation

1 **Clone the Repository**

```sh
git clone https://github.com/ehernandezvilla/travel-app.git
cd travel app
npm install
```

2 **Setup Environment Variables**

Create a .env file in the root directory and add the following with your respective API keys:

```sh
PIXABAY_API=[Your Pixabay API Key]
WEATHERBIT_API=[Your Weatherbit API Key]
GEONAMES_USERNAME=[Your Geonames Username]
```

3 **Start the Server**

```sh
npm start
```
  
The server will start running on <http://localhost:8081>.

4 **Visit the Application**

Open your browser and visit <http://localhost:8081>.

## Testing

Tests are written using Jest. To run the tests, you can run the following command:

```sh
npm test
```

## Live demo

For a live demo of the application go to <https://travel-app-1c31.onrender.com>

## API Documentation

### Endpoints

GET /all

- Description: Get a welcome message.
- Response: A welcome message string.

POST /getGeonames

- Description: Get information about the destination.
- Request Body:
  - destination: String (format: "city, country")
- Response: JSON object containing information about the destination.

### Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

### License

MIT

### Acknowledgements

- Geonames
- Weatherbit
- Pixabay
- REST Countries
