const sqlite3 = require('sqlite3').verbose(); 
const fs = require('fs');
const uuid = require('uuid');
const DBController = require('../../controllers/DBController'); // Adjust path as needed
const path = require('path');

jest.mock('sqlite3');
jest.mock('fs');
jest.mock('uuid');
jest.mock('path');

// Mock data for testing
const mockDdlPath = '/path/to/ddl.sql';
const mockTestDataPath = '/path/to/populate.sql';
const mockCurrentDBPath = '/path/to/test_data.txt';
const mockDdlContent = 'CREATE TABLE users(...);';
const mockTestDataContent = 'INSERT INTO users(...);';
const mockUuid = '123e4567-e89b-12d3-a456-426614174000';

// Set up mocks
fs.readFileSync.mockReturnValueOnce(mockDdlContent).mockReturnValueOnce(mockTestDataContent);
path.join.mockReturnValueOnce(mockDdlPath).mockReturnValueOnce(mockTestDataPath).mockReturnValue(mockCurrentDBPath);
uuid.v4.mockReturnValue(mockUuid);

// Helper function to create a DBController instance and initialize the database
async function createDBController() {
  const dbController = new DBController();
  await dbController.initialize();
  return dbController;
}

describe('DBController', () => {
  let dbController;

  beforeEach(async () => {
    dbController = await createDBController();
  });

  afterEach(() => {
    dbController.close();
    jest.clearAllMocks();
  });

  describe('initialize', () => {
    it('creates tables if database does not exist', async () => {
      fs.statSync.mockImplementationOnce(() => {
        throw new Error('Database does not exist');
      });

      await dbController.initialize();

      expect(sqlite3.cached.Database).toHaveBeenCalledWith(mockCurrentDBPath);
      expect(dbController.db.serialize).toHaveBeenCalled();
      expect(dbController.db.run).toHaveBeenCalledWith(mockDdlContent.trim() + ';');
    });

    it('resolves with "Database initialized" if database already exists', async () => {
      const result = await dbController.initialize();
      expect(result).toEqual({ init: 'Database ready' });
    });
  });

  describe('populate', () => {
    it('populates data if database exists', async () => {
      await dbController.populate();

      expect(sqlite3.cached.Database).toHaveBeenCalledWith(mockCurrentDBPath);
      expect(dbController.db.serialize).toHaveBeenCalled();
      expect(dbController.db.run).toHaveBeenCalledWith(mockTestDataContent.trim() + ';');
    });

    it('resolves with "Database does not exist" if database is missing', async () => {
      fs.statSync.mockImplementationOnce(() => {
        throw new Error('Database does not exist');
      });

      const result = await dbController.populate();
      expect(result).toEqual({ populate: 'Database does not exist' });
    });
  });

  describe('recordExists', () => {
    it('resolves true if record exists', async () => {
      dbController.db.get.mockImplementationOnce((sql, params, callback) => {
        callback(null, { count: 1 });
      });

      const result = await dbController.recordExists('table', 'column', 'value');
      expect(result).toBe(true);
    });

    it('resolves false if record does not exist', async () => {
      dbController.db.get.mockImplementationOnce((sql, params, callback) => {
        callback(null, { count: 0 });
      });

      const result = await dbController.recordExists('table', 'column', 'value');
      expect(result).toBe(false);
    });
  });

  // ... tests for other methods (createNewPublicUser, getPublicUser, etc.)
});