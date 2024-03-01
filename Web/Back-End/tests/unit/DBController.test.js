const DBController = require("../../controllers/DBController");
const fs = require("fs");

// Mock dependencies
jest.mock("sqlite3", () => ({
  verbose: jest.fn(() => ({
    Database: jest.fn(() => ({
      serialize: jest.fn((callback) => callback()),
      run: jest.fn((query, values) => {}),
      get: jest.fn((query, values, callback) => {
        callback(null, { count: 0 });
      }),
      all: jest.fn((query, values) => {}),
      close: jest.fn(),
    })),
    cached: {
      Database: jest.fn(() => ({
        serialize: jest.fn(),
        run: jest.fn(),
        get: jest.fn(),
        all: jest.fn(),
        close: jest.fn(),
      })),
    },
  })),
}));

jest.mock("fs", () => ({
  stat: jest.fn((path, callback) => callback(null, {})),
  readFileSync: jest.fn(() => "Test string ;-- String test"),
}));
jest.mock("uuid", () => ({
  v4: jest.fn(() => "mock-uuid"),
}));

describe("DBController", () => {
  let dbController;

  beforeEach(() => {
    dbController = new DBController();
    dbController.initialize();
  });

  afterEach(() => {
    // Close the database connection after each test
    dbController.close();
    jest.clearAllMocks();
  });

  describe("initialize", () => {
    it("should create tables if database does not exist", async () => {
      let spyStat = jest
        .spyOn(fs, "stat")
        .mockImplementationOnce((path, callback) =>
          callback("File does not exist", {})
        );

      await expect(dbController.initialize()).resolves.toEqual({
        init: "Database initialized",
      });

      expect(spyStat).toHaveBeenCalled(); // DDL
      expect(dbController.db.serialize).toHaveBeenCalled();
      expect(dbController.db.run).toHaveBeenCalled();
    });

    it("should not create tables if database exists", async () => {
      await expect(dbController.initialize()).resolves.toEqual({
        init: "Database ready",
      });
    });
  });

  describe("populate", () => {
    let spyStat;
    it("should populate tables if database exists", async () => {
      spyStat = jest.spyOn(fs, "stat");

      await expect(dbController.populate()).resolves.toEqual({
        populate: "Database populated",
      });

      expect(spyStat).toHaveBeenCalled(); // DDL
      expect(dbController.db.serialize).toHaveBeenCalled();
      expect(dbController.db.run).toHaveBeenCalled();
    });

    it("should not populate tables if database does not exist", async () => {
      spyStat = jest
        .spyOn(fs, "stat")
        .mockImplementationOnce((path, callback) => callback(true, {}));

      await expect(dbController.populate()).rejects.toEqual({
        populate: "Database does not exist",
      });
    });
  });

  describe("recordExists", () => {
    it("should resolve to true if record exists", async () => {
      let spy = jest
        .spyOn(dbController.db, "get")
        .mockImplementationOnce((query, values, callback) => {
          callback(null, { count: 5 });
        });

      await expect(
        dbController.recordExists("testTable", "test_col", "test_value")
      ).resolves.toBeTruthy();
      expect(spy).toHaveBeenCalledWith(
        spy.mock.calls[0][0],
        { $record_id: "test_value" },
        spy.mock.calls[0][2]
      );
    });

    it("should resolve to false if record does not exist", async () => {
      let spy = jest.spyOn(dbController.db, "get");

      await expect(
        dbController.recordExists("testTable", "test_col", "test_value")
      ).resolves.toBeFalsy();
      expect(spy).toHaveBeenCalledWith(
        spy.mock.calls[0][0],
        { $record_id: "test_value" },
        spy.mock.calls[0][2]
      );
    });
  });

  describe("close", () => {
    let closeSpy;
    let consoleSpy = jest.spyOn(console, "log");
    it("should log error if error is thrown", () => {
      let testError = new Error("test error");
      closeSpy = jest
        .spyOn(dbController.db, "close")
        .mockImplementationOnce((callback) => callback(testError));

      dbController.close();
      expect(closeSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error closing database:",
        testError
      );
    });

    it("should log success message upon successful close", () => {
      closeSpy = jest
        .spyOn(dbController.db, "close")
        .mockImplementationOnce((callback) => callback(false));

      dbController.close();
      expect(closeSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith("Database connection closed.");
    });
  });
});
