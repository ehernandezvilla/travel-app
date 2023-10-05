// __tests__/server.test.js

const request = require('supertest');
const app = require('../src/server/index');  // Import your app
jest.mock('node-fetch');  // Mocking the fetch function
const fetch = require('node-fetch');
const { Response } = jest.requireActual('node-fetch');

describe('GET /all', () => {
    it('should return welcome message', async () => {
        const res = await request(app).get('/all');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('Welcome to the travel app project!');
    });
});

describe('POST /getGeonames', () => {
    it('should return JSON data', async () => {
        // Mock data
        const mockGeonamesData = { geonames: [{ toponymName: 'City', countryName: 'Country', lat: '0', lng: '0' }] };
        const mockPixabayData = { hits: [{ largeImageURL: 'http://example.com/image.jpg' }] };
        const mockWeatherbitData = { data: [{ temp: '25', weather: { description: 'Clear sky' } }] };
        const mockRestcountriesData = [{ capital: 'Capital', population: 1000000, flags: { png: 'http://example.com/flag.png' }, timezones: ['UTC+0'], languages: { eng: 'English' }, maps: { openStreetMaps: 'http://example.com/map' } }];

        // Mock the external API calls
        fetch.mockReturnValueOnce(
            Promise.resolve(new Response(JSON.stringify(mockGeonamesData)))
        ).mockReturnValueOnce(
            Promise.resolve(new Response(JSON.stringify(mockPixabayData)))
        ).mockReturnValueOnce(
            Promise.resolve(new Response(JSON.stringify(mockWeatherbitData)))
        ).mockReturnValueOnce(
            Promise.resolve(new Response(JSON.stringify(mockRestcountriesData)))
        );

        const res = await request(app).post('/getGeonames').send({ destination: 'city, country' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toEqual('Success!');
        expect(res.body).toHaveProperty('imageURL', mockPixabayData.hits[0].largeImageURL);
        expect(res.body).toHaveProperty('temperature', mockWeatherbitData.data[0].temp);
        expect(res.body).toHaveProperty('weatherDescription', mockWeatherbitData.data[0].weather.description);
    });
});
