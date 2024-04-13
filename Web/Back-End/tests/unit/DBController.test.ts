import DBController from "../../controllers/DBController";
import fs, {PathLike, Stats} from "fs";

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

describe("DBController", () => {
  let dbController = new DBController();

  beforeEach(() => {
    dbController.initialize();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("initialize", () => {
    it("should create tables if database does not exist",  async () => {
      // let spyStat = jest
      //   .spyOn(fs, "stat")
      //   .mockImplementationOnce((path: PathLike, undefined, callback: (err: NodeJS.ErrnoException | null, stats: Stats ) => void) =>
      //     {callback(new Error("File does not exist"), {} as fs.Stats)}
      //   );

      await expect(dbController.initialize()).resolves.toEqual({
        init: "Database initialized",
      });

      //expect(spyStat).toHaveBeenCalled(); // DDL
      expect(dbController.db.serialize).toHaveBeenCalled();
      expect(dbController.db.run).toHaveBeenCalled();
    });
  });

  describe("populate", () => {
    let spyStat;
    it("should populate tables if database exists", async () => {
      //spyStat = jest.spyOn(fs, "stat");

      await expect(dbController.populate()).resolves.toEqual({
        populate: "Database populated",
      });

      //expect(spyStat).toHaveBeenCalled(); // DDL
      expect(dbController.db.serialize).toHaveBeenCalled();
      expect(dbController.db.run).toHaveBeenCalled();
    });

    // it("should not populate tables if database does not exist", async () => {
    //   spyStat = jest
    //     .spyOn(fs, "stat")
    //     .mockImplementationOnce((path, options, callback) =>
    //       callback(new Error(), {} as fs.Stats)
    //     );

    //   await expect(dbController.populate()).rejects.toEqual({
    //     populate: "Database does not exist",
    //   });
    // });
  });

  describe("recordExists", () => {
    it("should resolve to true if record exists", async () => {
      let spy = jest
        .spyOn(dbController.db, "get")
        .mockImplementationOnce((query, values, callback) => {
          callback(null, { count: 5 });
          return dbController.db;
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
        .mockImplementationOnce((callback) => {
          if (callback) callback(testError);
        });

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
        .mockImplementationOnce((callback) => {
          if (callback) callback(null);
        });

      dbController.close();
      expect(closeSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith("Database connection closed.");
    });
  });
});
