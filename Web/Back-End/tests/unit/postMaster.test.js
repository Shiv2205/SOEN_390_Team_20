const PostsMaster = require("../../repo/postsMaster");
const DBControllerFactory = require("../../Factory/DBControllerFactory");

const createPostOutput = {
  status: 201,
  post_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
};

const getUserPostsOutput = {
  status: 200,
  data: [
    {
      post_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
      creator_id: "user_id",
      title: "Post Title",
      content: "Post Content",
      created_at: "2024-02-29T12:00:00Z",
    },
  ],
};

const getPropertyPostsOutput = {
  status: 200,
  data: [
    {
      post_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
      creator_id: "user_id",
      title: "Post Title",
      content: "Post Content",
      created_at: "2024-02-29T12:00:00Z",
    },
  ],
};

const factoryMockSpy = jest
  .spyOn(DBControllerFactory, "createInstance")
  .mockImplementation(() => ({
    createNewPost: jest.fn((postData) => createPostOutput),
    getAllUserPosts: jest.fn(() => getUserPostsOutput),
    getAllPropertyPosts: jest.fn(() => getPropertyPostsOutput),
  }));

describe("PostsMaster", () => {
  let postController;

  // Test method for error branches
  const errorHandler = (methodName) => {
    it("should handle errors", async () => {
      let testError = new Error("Test Error");
      let dbMockSpy = jest
        .spyOn(postController.dbController, methodName)
        .mockImplementationOnce(() => {
          throw testError;
        });

      switch (methodName) {
        case "createNewPost":
          await expect(postController.createPost({})).resolves.toEqual(
            testError
          );
          break;
        case "getAllUserPosts":
          await expect(postController.getUserPosts("user_id")).resolves.toEqual(
            testError
          );
          break;
        case "getAllPropertyPosts":
          await expect(
            postController.getPropertyPosts("property_id")
          ).resolves.toEqual(testError);
          break;
      }
    });
  };

  beforeEach(() => {
    postController = new PostsMaster();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createPost", () => {
    it("creates a new post successfully", async () => {
      const postData = {
        creator_id: "user_id",
        title: "Post Title",
        content: "Post Content",
      };

      let postSpy = jest.spyOn(postController, "createPost");

      const result = await postController.createPost(postData);
      expect(result).toEqual(createPostOutput);
      expect(postSpy).toHaveBeenCalledWith(postData);
      expect(postController.dbController.createNewPost).toHaveBeenCalled();
      expect(postController.dbController.createNewPost).toHaveBeenCalledWith(
        postData
      );
    });

    errorHandler("createNewPost");
  });

  describe("getUserPosts", () => {
    it("retrieves user posts successfully", async () => {
      const userId = "user_id";

      let postSpy = jest.spyOn(postController, "getUserPosts");

      let result = await postController.getUserPosts(userId);
      expect(result).toEqual(getUserPostsOutput);
      expect(postSpy).toHaveBeenCalledWith(userId);
      expect(postController.dbController.getAllUserPosts).toHaveBeenCalled();
      expect(postController.dbController.getAllUserPosts).toHaveBeenCalledWith(
        userId
      );
    });

    errorHandler("getAllUserPosts");
  });

  describe("getPropertyPosts", () => {
    it("retrieves property posts successfully", async () => {
      const propertyId = "property_id";

      let postSpy = jest.spyOn(postController, "getPropertyPosts");

      let result = await postController.getPropertyPosts(propertyId);
      expect(result).toEqual(getPropertyPostsOutput);
      expect(postSpy).toHaveBeenCalledWith(propertyId);
      expect(postController.dbController.getAllPropertyPosts).toHaveBeenCalled();
      expect(
        postController.dbController.getAllPropertyPosts
      ).toHaveBeenCalledWith(propertyId);
    });

    errorHandler("getAllPropertyPosts");
  });
});
