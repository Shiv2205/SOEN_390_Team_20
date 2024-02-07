const request = require('supertest');
const app = require('../../index'); // Import the Express app
const fs = require('fs/promises');
const path = require('path');

// Function to clear user_data.json after each test
async function clearUserData() {
  const dataFilePath = path.join(process.cwd(), 'data/test_user_data.json');
  await fs.writeFile(dataFilePath, '[]');
}

// Clear data before each test
beforeEach(clearUserData);

describe('POST /signup', () => {
  it('should add a new user successfully', async () => {
    const res = await request(app)
      .post('/signup')
      .send({ fullname: 'John Doe', email: 'johndoe@example.com', password: 'qwerty123', confirmPassword: 'qwerty123' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ response: 'User added successfully!' });

    // Check if user data was added to the file
    const dataFilePath = path.join(process.cwd(), 'data/test_user_data.json');
    const fileData = await fs.readFile(dataFilePath, 'utf-8');
    const userData = JSON.parse(fileData);
    expect(userData).toEqual([{ fullname: 'John Doe', email: 'johndoe@example.com', password: 'qwerty123', confirmPassword: 'qwerty123' }]);
  });

  it('should handle existing email error', async () => {
    // Add an existing user to the file
    await fs.writeFile(
      path.join(process.cwd(), 'data/test_user_data.json'),
      JSON.stringify([{ fullname: 'Jane Doe', email: 'janedoe@example.com', password: 'qwerty123', confirmPassword: 'qwerty123' }])
    );

    const res = await request(app)
      .post('/signup')
      .send({ fullname: 'Jane Doe', email: 'janedoe@example.com', password: 'qwerty123', confirmPassword: 'qwerty123' });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ response: 'This email address is already in use' });
  });

  it('should handle missing data', async () => {
    const res = await request(app).post('/signup');

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ response: 'Data not received' });
  });

  // Add more test cases for different error scenarios and edge cases
});


// Clear data after all tests
afterAll(clearUserData);