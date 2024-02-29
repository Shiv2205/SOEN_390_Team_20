const DBController = require("../../controllers/DBController");
const fs = require("fs");
//const sqlite3 = require('sqlite3');

// jest.mock("../../controllers/DBController", () => {
//   // return jest.fn().mockImplementation(() => ({
//   //   initialize: jest.fn(async () => {
//   //     return new Promise((resolve) => resolve({ init: "Database ready" }));
//   //   }),
//   //   populate: jest.fn(),
//   //   recordExists: jest.fn(),
//   //   createNewPublicUser: jest.fn(),
//   //   getPublicUser: jest.fn(),
//   //   createNewEmployee: jest.fn(),
//   //   getEmployee: jest.fn(),
//   //   getAllEmployees: jest.fn(),
//   //   createNewProperty: jest.fn(),
//   //   getProperty: jest.fn(),
//   //   getAllProperties: jest.fn(),
//   //   createNewUnit: jest.fn(),
//   //   getUnit: jest.fn(),
//   //   getAllUnits: jest.fn(),
//   //   createNewPost: jest.fn(),
//   //   getAllUserPosts: jest.fn(),
//   //   getAllPropertyPosts: jest.fn(),
//   //   close: jest.fn(),
//   // }));
// }).requireActual("../../controllers/DBController");

// Mock dependencies
jest.mock("sqlite3", () => ({
  verbose: jest.fn(() => ({
    Database: jest.fn(() => ({
      serialize: jest.fn(),
      run: jest.fn(),
      get: jest.fn(),
      all: jest.fn(),
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
  readFileSync: jest.fn(),
}));
jest.mock("uuid", () => ({
  v4: jest.fn(() => "mock-uuid"),
}));

describe("DBController", () => {
  let dbController; // = new DBController();//DBController.prototype;
  const recordExistsTest = require("./utils/recordExistsTest");

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
          callback(new Error("File does not exist"))
        );

      await expect(dbController.initialize()).resolves.toEqual({
        init: "Database initialized",
      });

      expect(spyStat).toHaveBeenCalled(); // DDL
      expect(dbController.db.serialize).toHaveBeenCalledTimes(1);
    });

    it("should not create tables if database exists", async () => {
      await expect(dbController.initialize()).resolves.toEqual({
        init: "Database ready",
      });
    });
  });

  describe("createNewPublicUser", () => {
    let spy;
    let testRecord = {
      fullname: "John Doe",
      email: "john@example.com",
    };
    it("should return status code 400 if user exists", async () => {
      spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(true);

      await expect(
        dbController.createNewPublicUser(testRecord)
      ).resolves.toEqual({ status: 400, message: "User already resgistered!" });

      recordExistsTest(spy, {
        tableName: "account",
        fieldName: "email",
        value: testRecord.email,
      });
    });

    it("should add a new user and return a status 200 and the  inserted id", async () => {
      spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(false);

      await expect(
        dbController.createNewPublicUser(testRecord)
      ).resolves.toEqual({ status: 201, account_id: "mock-uuid" });

      recordExistsTest(spy, {
        tableName: "account",
        fieldName: "email",
        value: testRecord.email,
      });
    });
  });

  describe("getPublicUser", () => {
    let spy;
    let testRecord = {
      password: "John Doe",
      email: "john@example.com",
    };

    it("should return { status: 400, message: 'Something  went wrong' }", async () => {
      spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(true);

      let getPublicUserSPy = jest.spyOn(dbController, "getPublicUser")

      await expect(
        dbController.getPublicUser(testRecord.email, testRecord.password)
      ).resolves.toEqual({ status: 400, message: "Something  went wrong" });
      expect(dbController.db.get).toHaveBeenCalled();
      expect(getPublicUserSPy).toHaveBeenCalledWith(testRecord.email, testRecord.password);

      recordExistsTest(spy, {
        tableName: "account",
        fieldName: "email",
        value: testRecord.email,
      });
    });


  });
});
