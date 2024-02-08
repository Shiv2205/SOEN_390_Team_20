const fs = require('fs/promises');
const path = require('path');
const getUserData = require('../../util/getUserData');

jest.mock('fs/promises'); // Mocking fs.promises module

describe('getUserData function', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });

  it('should read user data from file and parse it correctly', async () => {
    const mockUserData = [{ email: 'test@example.com', password: 'password' }];
    const mockFileData = JSON.stringify(mockUserData);

    fs.readFile.mockResolvedValue(mockFileData);

    const userData = await getUserData();

    expect(fs.readFile).toHaveBeenCalledTimes(1);
    expect(fs.readFile).toHaveBeenCalledWith(expect.any(String), 'utf-8');
    expect(userData).toEqual(mockUserData);
  });

  it('should handle errors thrown by fs.readFile', async () => {
    const errorMessage = 'File read error';
    fs.readFile.mockRejectedValue(new Error(errorMessage));

    const userData = await getUserData();

    expect(fs.readFile).toHaveBeenCalledTimes(1);
    expect(userData).toBeUndefined();
  });

  it('should handle JSON parsing errors', async () => {
    const invalidJson = '{invalidJson}';
    fs.readFile.mockResolvedValue(invalidJson);

    const userData = await getUserData();

    expect(fs.readFile).toHaveBeenCalledTimes(1);
    expect(userData).toBeUndefined();
  });
});
