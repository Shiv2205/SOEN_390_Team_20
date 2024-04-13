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

describe("posts tests", () => {
  let dbController = new DBController();
  beforeEach(() => {
    dbController.initialize();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createNewPost", () => {
    let postSpy;
    let mockRes;
    let testRecord = {
      property_id: "test-property-id",
      creator_id: "test-creator-id",
      content: "Test post content",
      replied_to: "test-replied-to-id",
    };
    it("should create a new post", async () => {
      mockRes = { status: 201, post_id: "mock-uuid" };

      postSpy = jest.spyOn(dbController, "createNewPost");

      await expect(dbController.createNewPost(testRecord)).resolves.toEqual(
        mockRes
      );
      expect(postSpy).toHaveBeenCalledWith(testRecord);
      expect(dbController.db.run).toHaveBeenCalled();
      expect(dbController.db.run).toHaveBeenCalledWith(
        `INSERT INTO post 
                (post_id, property_id, creator_id, content, replied_to) 
                VALUES (?, ?, ?, ?, ?)`,
        [
          mockRes.post_id,
          testRecord.property_id,
          testRecord.creator_id,
          testRecord.content,
          testRecord.replied_to,
        ]
      );
    });
  });

  describe("getAllUserPosts", () => {
    let testCreatorID = "test-creator-id";
    let postSpy;

    it("should resolve to a status 204 if no posts were found", async () => {
      let spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(false);

      await expect(
        dbController.getAllUserPosts(testCreatorID)
      ).resolves.toEqual({
        status: 204,
        message: "User has no posts in database.",
      });

      recordExistsTest(spy, {
        tableName: "post",
        fieldName: "creator_id",
        value: testCreatorID,
      });
    });

    it("should return all user posts if found", async () => {
      postSpy = jest.spyOn(dbController, "getAllUserPosts");

      let spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(true);

      await expect(
        dbController.getAllUserPosts(testCreatorID)
      ).resolves.toBeTruthy();
      expect(dbController.db.all).toHaveBeenCalled();
      expect(dbController.db.all).toHaveBeenCalledWith(
        "SELECT * FROM post_details WHERE creator_id = ?;",
        testCreatorID,
        (dbController.db.all as jest.Mock).mock.calls[0][2] // callback function is the last argument in this call
      );
      expect(postSpy).toHaveBeenCalledWith(testCreatorID);

      recordExistsTest(spy, {
        tableName: "post",
        fieldName: "creator_id",
        value: testCreatorID,
      });
    });
  });

  describe("getAllPostsReplies", () => {
    let testPostID = "test-post-id";
    let postSpy;

    it("should resolve to a status 204 if no replies were found", async () => {
      let spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(false);

      await expect(
        dbController.getAllPostsReplies(testPostID)
      ).resolves.toEqual({
        status: 204,
        message: "No replies for this post in database.",
      });

      recordExistsTest(spy, {
        tableName: "post",
        fieldName: "post_id",
        value: testPostID,
      });
    });

    it("should return all post replies if found", async () => {
      postSpy = jest.spyOn(dbController, "getAllPostsReplies");

      let spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(true);

      await expect(
        dbController.getAllPostsReplies(testPostID)
      ).resolves.toBeTruthy();
      expect(dbController.db.all).toHaveBeenCalled();
      expect(dbController.db.all).toHaveBeenCalledWith(
        "SELECT * FROM post_details WHERE replied_to = ?;",
        testPostID,
        (dbController.db.all as jest.Mock).mock.calls[0][2] // callback function is the last argument in this call
      );
      expect(postSpy).toHaveBeenCalledWith(testPostID);

      recordExistsTest(spy, {
        tableName: "post",
        fieldName: "post_id",
        value: testPostID,
      });
    });
  });

  describe("getAllPropertyPosts", () => {
    let testPropertyID = "test-property-id";
    let postSpy;

    it("should resolve to a status 204 if no posts were found", async () => {
      let spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(false);

      await expect(
        dbController.getAllPropertyPosts(testPropertyID)
      ).resolves.toEqual({
        status: 204,
        message: "Property has no posts in database.",
      });

      recordExistsTest(spy, {
        tableName: "post",
        fieldName: "property_id",
        value: testPropertyID,
      });
    });

    it("should return all property posts if found", async () => {
      postSpy = jest.spyOn(dbController, "getAllPropertyPosts");

      let spy = jest
        .spyOn(dbController, "recordExists")
        .mockResolvedValueOnce(true);

      await expect(
        dbController.getAllPropertyPosts(testPropertyID)
      ).resolves.toBeTruthy();
      expect(dbController.db.all).toHaveBeenCalled();
      expect(dbController.db.all).toHaveBeenCalledWith(
        "SELECT * FROM post_details WHERE property_id = ?;",
        testPropertyID,
        (dbController.db.all as jest.Mock).mock.calls[0][2] // callback function is the last argument in this call
      );
      expect(postSpy).toHaveBeenCalledWith(testPropertyID);

      recordExistsTest(spy, {
        tableName: "post",
        fieldName: "property_id",
        value: testPropertyID,
      });
    });
  });
});
