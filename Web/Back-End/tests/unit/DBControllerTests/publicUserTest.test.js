const recordExistsTest = require("../utils/recordExistsTest");
const DBController = require("../../../controllers/DBController");

// Mock dependencies
jest.mock("sqlite3", () => ({
  verbose: jest.fn(() => ({
    Database: jest.fn(() => ({
      serialize: jest.fn(),
      run: jest.fn((query, values) => {}),
      get: jest.fn((query, values, callback) => {callback(null, "test")}),
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
  readFileSync: jest.fn(),
}));
jest.mock("uuid", () => ({
  v4: jest.fn(() => "mock-uuid"),
}));

describe("Public user tests", () => {
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
        dbController.createNewPublicUser({...testRecord, password: "test"})
      ).resolves.toEqual({ status: 201, account_id: "mock-uuid" });
      expect(dbController.db.run).toHaveBeenCalled();
      expect(dbController.db.run).toHaveBeenCalledWith(
        "INSERT INTO account (account_id, fullname, password, email, phone_number, profile_picture, account_type) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            "mock-uuid",
            testRecord.fullname,
            "test",
            testRecord.email,
            null,
            null,
            "Public",
          ]
      );

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

    it("should return 'pass' to indicate successful fetch", async () => {
      spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(true);

      let getPublicUserSPy = jest.spyOn(dbController, "getPublicUser");

      await expect(dbController.getPublicUser(testRecord.email, testRecord.password)).resolves.toBeTruthy();;
      expect(dbController.db.get).toHaveBeenCalled();
      expect(dbController.db.get).toHaveBeenCalledWith(
        dbController.db.get.mock.calls[0][0],
        [testRecord.email, testRecord.password],
        dbController.db.get.mock.calls[0][2] // callback function is the last argument in this call
      );
      expect(getPublicUserSPy).toHaveBeenCalledWith(
        testRecord.email,
        testRecord.password
      );

      recordExistsTest(spy, {
        tableName: "account",
        fieldName: "email",
        value: testRecord.email,
      });
    });

    it("should return { status: 400, message: 'User does not have an account.'}", async () => {
      spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(false);

      await expect(
        dbController.getPublicUser(testRecord.email, testRecord.password)
      ).resolves.toEqual({
        status: 400,
        message: "User does not have an account.",
      });
    });
  });
});
