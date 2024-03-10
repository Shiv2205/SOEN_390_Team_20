import recordExistsTest from "../utils/recordExistsTest";
import DBController from "../../../controllers/DBController";
import fs from "fs";

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

describe("units tests", () => {
  let dbController = new DBController();
  beforeEach(() => {
    dbController.initialize();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createNewUnit", () => {
    let spy;
    let unitSpy;
    let mockRes;
    let testRecord = {
      property_id: "test-property-id",
      size: 100,
      monthly_rent: 500,
      condo_fee: 50,
      condo_balance: 200,
      owner_id: "test-owner-id",
      renter_id: "test-renter-id",
      owner_registration_key: "test-owner-reg-key",
      renter_registration_key: "test-renter-reg-key",
    };
    it("should create a unit", async () => {
      mockRes = { status: 201, unit_id: "mock-uuid" };

      unitSpy = jest.spyOn(dbController, "createNewUnit");

      await expect(dbController.createNewUnit(testRecord)).resolves.toEqual(
        mockRes
      );
      expect(unitSpy).toHaveBeenCalledWith(testRecord);
      expect(dbController.db.run).toHaveBeenCalled();
      expect(dbController.db.run).toHaveBeenCalledWith(
        (dbController.db.run as jest.Mock).mock.calls[0][0],
        [
          mockRes.unit_id,
          testRecord.property_id,
          testRecord.size,
          testRecord.monthly_rent,
          testRecord.condo_fee,
          testRecord.condo_balance,
          testRecord.owner_id,
          testRecord.renter_id,
          testRecord.owner_registration_key,
          testRecord.renter_registration_key,
        ]
      );
    });
  });

  describe("getUnit", () => {
    let testUnitID = "test-unit-id";
    let spy;
    let unitSpy;

    it("should reject if unit does not exist", async () => {
      spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(false);

      await expect(dbController.getUnit(testUnitID)).rejects.toEqual({
        status: 400,
        message: "Unit does not exist in database.",
      });

      recordExistsTest(spy, {
        tableName: "unit",
        fieldName: "unit_id",
        value: testUnitID,
      });
    });

    it("should resolve unit info if unit exists", async () => {
      spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(true);

      unitSpy = jest.spyOn(dbController, "getUnit");

      await expect(dbController.getUnit(testUnitID)).resolves.toBeTruthy();
      expect(dbController.db.get).toHaveBeenCalled();
      expect(dbController.db.get).toHaveBeenCalledWith(
        (dbController.db.get as jest.Mock).mock.calls[0][0],
        testUnitID,
        (dbController.db.get as jest.Mock).mock.calls[0][2] // callback function is the last argument in this call
      );
      expect(unitSpy).toHaveBeenCalledWith(testUnitID);

      recordExistsTest(spy, {
        tableName: "unit",
        fieldName: "unit_id",
        value: testUnitID,
      });
    });
  });

  describe("getAllUnits", () => {
    let testPropertyID = "test-property-id";
    let spy;
    it("should resolve to a status 204 if no units were found", async () => {
      spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(false);

      await expect(dbController.getAllUnits(testPropertyID)).resolves.toEqual({
        status: 204,
        message: "Property does not have any units in database.",
      });

      recordExistsTest(spy, {
        tableName: "unit",
        fieldName: "property_id",
        value: testPropertyID,
      });
    });

    it("should return all units if found", async () => {
      spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(true);

      let getAllUnitsSpy = jest.spyOn(dbController, "getAllUnits");

      await expect(
        dbController.getAllUnits(testPropertyID)
      ).resolves.toBeTruthy();
      expect(dbController.db.all).toHaveBeenCalled();
      expect(dbController.db.all).toHaveBeenCalledWith(
        (dbController.db.all as jest.Mock).mock.calls[0][0],
        testPropertyID,
        (dbController.db.all as jest.Mock).mock.calls[0][2] // callback function is the last argument in this call
      );
      expect(getAllUnitsSpy).toHaveBeenCalledWith(testPropertyID);

      recordExistsTest(spy, {
        tableName: "unit",
        fieldName: "property_id",
        value: testPropertyID,
      });
    });
  });
});
