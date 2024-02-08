const request = require('supertest');
const express = require('express');
const router = require('../../routes/login');
const getUserData = require('../../util/getUserData');

jest.mock('../../util/getUserData'); // Mocking getUserData function

const app = express();
app.use(express.json());
app.use('/', router);

describe('POST /', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });

  it('should return 400 if no data received', async () => {
    const response = await request(app).post('/');
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ response: 'Data not received' });
  });

  it('should return 201 and login data if user exists', async () => {
    const mockUserData = [
      { email: 'test@example.com', password: 'qwerty123', name: 'Test User' }
    ];
    getUserData.mockResolvedValue(mockUserData);

    const response = await request(app)
      .post('/')
      .send({ email: 'test@example.com', password: 'qwerty123' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      response: 'User logged in successfully!',
      loginData: { email: 'test@example.com', password: 'qwerty123', name: 'Test User' }
    });
  });

  it('should return 500 if user does not exist', async () => {
    const mockUserData = [];
    getUserData.mockResolvedValue(mockUserData);

    const response = await request(app)
      .post('/')
      .send({ email: 'test@example.com', password: 'qwerty123' });

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ response: 'Email or password is incorrect' });
  });

  it('should return 500 if getUserData throws an error', async () => {
    getUserData.mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .post('/')
      .send({ email: 'test@example.com', password: 'qwerty123' });

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ response: 'Database error' });
  });
});
