const request = require('supertest');
const express = require('express');
const app = express();

// This is a mock of your server.js setup
app.get('/all', (req, res) => {
    res.send('Welcome to the Weather Journal App Project!');
});

describe('Test the root path', () => {
    test('It should respond to the GET method', async () => {
        const response = await request(app).get('/all');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Welcome to the Weather Journal App Project!');
    });
});
