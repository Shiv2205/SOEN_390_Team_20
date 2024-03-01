const recordExistsTest = require("../utils/recordExistsTest");
const DBController = require("../../../controllers/DBController");

// Mock dependencies
jest.mock("sqlite3", () => ({
  verbose: jest.fn(() => ({
    Database: jest.fn(() => ({
      serialize: jest.fn(),
      run: jest.fn((query, values) => {}),
      get: jest.fn((query, values, callback) => {
        callback(null, "test");
      }),
      all: jest.fn((query, values, callback) => {
        callback(null, "test");
      }),
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

describe("property tests", () => {
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

  describe("createNewProperty", () => {
    let spy;
    let propertySpy;
    let mockRes;
    let testRecord = {
      unit_count: 10,
      parking_count: 10,
      locker_count: 10,
      address: "Somewhere",
      picture: "",
    };
    it("should create an property if it does not exist", async () => {
      mockRes = { status: 201, property_id: "mock-uuid" };
      spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(false);

      propertySpy = jest.spyOn(dbController, "createNewProperty");

      await expect(dbController.createNewProperty(testRecord)).resolves.toEqual(
        mockRes
      );
      expect(propertySpy).toHaveBeenCalledWith(testRecord);
      expect(dbController.db.run).toHaveBeenCalled();
      expect(dbController.db.run).toHaveBeenCalledWith(
        "INSERT INTO property (property_id, unit_count, parking_count, locker_count, address, picture) VALUES (?, ?, ?, ?, ?, ?)",
        [
          mockRes.property_id,
          testRecord.unit_count,
          testRecord.parking_count,
          testRecord.locker_count,
          testRecord.address,
          testRecord.picture,
        ]
      );

      recordExistsTest(spy, {
        tableName: "property",
        fieldName: "address",
        value: testRecord.address,
      });
    });

    it("should reject { status: 400, message: 'Property already exists!'}", async () => {
      mockRes = { status: 400, message: "Property already exists!" };
      spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(true);

      propertySpy = jest.spyOn(dbController, "createNewProperty");

      await expect(dbController.createNewProperty(testRecord)).rejects.toEqual(
        mockRes
      );
      expect(propertySpy).toHaveBeenCalled();
      expect(propertySpy).toHaveBeenCalledWith(testRecord);

      recordExistsTest(spy, {
        tableName: "property",
        fieldName: "address",
        value: testRecord.address,
      });
    });
  });

  describe("getProperty", () => {
    let testPropID = "test-prop-id";
    let spy;
    let propertySpy;

    it("should reject is property does not exist", async () => {
      spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(false);

      await expect(dbController.getProperty(testPropID)).rejects.toEqual({
        status: 400,
        message: "Property does not exist in database.",
      });

      recordExistsTest(spy, {
        tableName: "property",
        fieldName: "property_id",
        value: testPropID,
      });
    });

    it("should resolve property info if property exists", async () => {
      spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(true);

      propertySpy = jest.spyOn(dbController, "getProperty");

      await expect(dbController.getProperty(testPropID)).resolves.toBeTruthy();
      expect(dbController.db.get).toHaveBeenCalled();
      expect(dbController.db.get).toHaveBeenCalledWith(
        "SELECT * FROM property WHERE property_id = ?;",
        testPropID,
        dbController.db.get.mock.calls[0][2] // callback function is the last argument in this call
      );
      expect(propertySpy).toHaveBeenCalledWith(testPropID);

      recordExistsTest(spy, {
        tableName: "property",
        fieldName: "property_id",
        value: testPropID,
      });
    });
  });

  describe("getAllProperties", () => {
    let testEmpID = "test-id";
    let spy;
    it("should resolve to a status 204 if no properties were found", async () => {
      spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(false);

      await expect(dbController.getAllProperties(testEmpID)).resolves.toEqual({
        status: 204,
        message: "No properties found for given employee",
      });

      recordExistsTest(spy, {
        tableName: "employee",
        fieldName: "employee_id",
        value: testEmpID,
      });
    });

    it("should return all properties if found", async () => {
      spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(true);

      let getAllPropertiesSpy = jest.spyOn(dbController, "getAllProperties");

      await expect(
        dbController.getAllProperties(testEmpID)
      ).resolves.toBeTruthy();
      expect(dbController.db.all).toHaveBeenCalled();
      expect(dbController.db.all).toHaveBeenCalledWith(
        dbController.db.all.mock.calls[0][0],
        [testEmpID],
        dbController.db.all.mock.calls[0][2] // callback function is the last argument in this call
      );
      expect(getAllPropertiesSpy).toHaveBeenCalledWith(testEmpID);

      recordExistsTest(spy, {
        tableName: "employee",
        fieldName: "employee_id",
        value: testEmpID,
      });
    });
  });
});
