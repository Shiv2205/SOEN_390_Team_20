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

describe("employee tests", () => {
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

  describe("createNewEmployee", () => {
    let spy;
    let employeeSpy;
    let testRecord = {
      fullname: "John Doe",
      email: "john@example.com",
      password: "password1",
      type: "testEmployee",
    };
    it("should create an employee account even if employee has public account", async () => {
      spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(true);

      employeeSpy = jest
        .spyOn(dbController, "getPublicUser")
        .mockResolvedValueOnce({
          status: 123,
          data: { account_id: "mock-uuid" },
        });

      await expect(dbController.createNewEmployee(testRecord)).resolves.toEqual(
        { status: 201, employee_id: "mock-uuid" }
      );
      expect(employeeSpy).toHaveBeenCalled();
      expect(employeeSpy).toHaveBeenCalledWith(
        testRecord.email,
        testRecord.password
      );
      expect(dbController.db.run).toHaveBeenCalled();
      expect(dbController.db.run).toHaveBeenCalledWith(
        "INSERT INTO employee (employee_id, property_id, type) VALUES (?, ?, ?)",
        ["mock-uuid", null, testRecord.type]
      );

      recordExistsTest(spy, {
        tableName: "account",
        fieldName: "email",
        value: testRecord.email,
      });
    });

    it("should add a new employee and new public user if employee does not yet have an account", async () => {
      spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(false);

      employeeSpy = jest
        .spyOn(dbController, "createNewPublicUser")
        .mockResolvedValueOnce({ status: 123, account_id: "mock-uuid" });

      await expect(dbController.createNewEmployee(testRecord)).resolves.toEqual(
        { status: 201, employee_id: "mock-uuid" }
      );
      expect(employeeSpy).toHaveBeenCalled();
      expect(employeeSpy).toHaveBeenCalledWith({
        fullname: testRecord.fullname,
        email: testRecord.email,
        password: testRecord.password,
        account_type: "Employee",
      });
      expect(dbController.db.run).toHaveBeenCalled();
      expect(dbController.db.run).toHaveBeenCalledWith(
        "INSERT INTO employee (employee_id, property_id, type) VALUES (?, ?, ?)",
        ["mock-uuid", null, testRecord.type]
      );

      recordExistsTest(spy, {
        tableName: "account",
        fieldName: "email",
        value: testRecord.email,
      });
    });
  });

  describe("getEmployee", () => {
    let spy;
    let testRecord = {
      password: "John Doe",
      email: "john@example.com",
    };

    it("should resolve to indicate succesful fetch", async () => {
      spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(true);

      let getEmployeeSPy = jest.spyOn(dbController, "getEmployee");

      await expect(
        dbController.getEmployee(testRecord.email, testRecord.password)
      ).resolves.toBeTruthy();
      expect(dbController.db.get).toHaveBeenCalled();
      expect(dbController.db.get).toHaveBeenCalledWith(
        "SELECT * FROM employee_data WHERE email = ? AND password = ?",
        [testRecord.email, testRecord.password],
        dbController.db.get.mock.calls[0][2] // callback function is the last argument in this call
      );
      expect(getEmployeeSPy).toHaveBeenCalledWith(
        testRecord.email,
        testRecord.password
      );

      recordExistsTest(spy, {
        tableName: "employee_data",
        fieldName: "email",
        value: testRecord.email,
      });
    });

    it("should return { status: 400, message: 'User does not have an account.'}", async () => {
      spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(false);

      await expect(
        dbController.getEmployee(testRecord.email, testRecord.password)
      ).rejects.toEqual({
        status: 400,
        message: "User does not have an account.",
      });
    });
  });

  describe("getAllEmployees", () => {
    let testPropID = "test-id";
    let spy;
    it("should resolve to a status 204 if no employees were found", async () => {
      spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(false);

      await expect(dbController.getAllEmployees(testPropID)).resolves.toEqual({
        status: 204,
        message: "No employees found for given property",
      });

      recordExistsTest(spy, {
        tableName: "property",
        fieldName: "property_id",
        value: testPropID,
      });
    });

    it("should return all employees if found", async () => {
      spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(true);

      let getAllEmployeesSpy = jest.spyOn(dbController, "getAllEmployees");

        await expect(
          dbController.getAllEmployees(testPropID)
        ).resolves.toBeTruthy();
        expect(dbController.db.all).toHaveBeenCalled();
        expect(dbController.db.all).toHaveBeenCalledWith(
          dbController.db.all.mock.calls[0][0],
          testPropID,
          dbController.db.all.mock.calls[0][2] // callback function is the last argument in this call
        );
        expect(getAllEmployeesSpy).toHaveBeenCalledWith(testPropID);
  
        recordExistsTest(spy, {
          tableName: "property",
          fieldName: "property_id",
          value: testPropID,
        });
    });
  });
});
