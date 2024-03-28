import recordExistsTest from "../utils/recordExistsTest";
import DBController from "../../../controllers/DBController";
import fs from "fs";
import { EmployeeData } from "../../../types/DBTypes";

// Mock dependencies
jest.mock("sqlite3", () => ({
  Database: jest.fn(() => ({
    serialize: jest.fn((callback?: (() => void) | undefined): void => {if(callback) callback()}), //if(callback) callback()
    run: jest.fn((query, values?: any) => {}),
    get: jest.fn(
      (
        query,
        values?: any,
        callback?: ((err: Error | null, row: {}) => void) | undefined
      ) => {
        if (callback) callback(null, { count: 0 });
      }
    ),
    all: jest.fn((
      query,
      values?: any,
      callback?: ((err: Error | null, row: [{}]) => void) | undefined
    ) => {
      if (callback) callback(null, [{ count: 0 }]);
    }),
    close: jest.fn(),
  })),
  cached: {
    Database: jest.fn(() => ({
      serialize: jest.fn((callback) => callback()),
      run: jest.fn((query, values) => {}),
      get: jest.fn((query, values, callback) => {
        callback(null, { count: 0 });
      }),
      all: jest.fn((query, values) => {}),
      close: jest.fn(),
    })),
  },
}));

jest.mock("fs", () => ({
  stat: jest.fn(
    (
      path,
      undefined, 
      callback: (err: NodeJS.ErrnoException | null, stats: fs.Stats) => void
    ) =>{ callback(null, {} as fs.Stats)}
  ), //((path, callback) => callback(null, {})),
  readFileSync: jest.fn(() => "Test string ;-- String test"),
}));
jest.mock("uuid", () => ({
  v4: jest.fn(() => "mock-uuid"),
}));

describe("employee tests", () => {
  let dbController = new DBController();
  beforeEach(() => {
    dbController.initialize();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createNewEmployee", () => {
    let spy;
    let employeeSpy;
    let testRecord: EmployeeData = {
      fullname: "John Doe",
      email: "john@example.com",
      password: "password1",
      type: "manager",
    };
    it("should create an employee account even if employee has public account", async () => {
      spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(true);

      employeeSpy = jest
        .spyOn(dbController, "getPublicUser")
        .mockResolvedValueOnce({
          status: 123,
          data: {
            account_id: "6e8f4b3c-4103-44b3-b694-cb9f6e3e3fc9",
            fullname: "Michael Scott",
            email: "michael@example.com",
            account_type: "Public",
          },
        });

      await expect(dbController.createNewEmployee(testRecord)).resolves.toEqual(
        { status: 201, employee_id: "6e8f4b3c-4103-44b3-b694-cb9f6e3e3fc9" }
      );
      expect(employeeSpy).toHaveBeenCalled();
      expect(employeeSpy).toHaveBeenCalledWith(
        testRecord.email,
        testRecord.password
      );
      expect(dbController.db.run).toHaveBeenCalled();
      expect(dbController.db.run).toHaveBeenCalledWith(
        "INSERT INTO employee (employee_id, property_id, type) VALUES (?, ?, ?)",
        ["6e8f4b3c-4103-44b3-b694-cb9f6e3e3fc9", null, testRecord.type]
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
        (dbController.db.get as jest.Mock).mock.calls[0][0],
        [testRecord.email],
        (dbController.db.get as jest.Mock).mock.calls[0][2] // callback function is the last argument in this call
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
          (dbController.db.all as jest.Mock).mock.calls[0][0],
          testPropID,
          (dbController.db.all as jest.Mock).mock.calls[0][2] // callback function is the last argument in this call
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
