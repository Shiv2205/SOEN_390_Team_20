import PostsMaster from "../../../repo/postsMaster";
import DBControllerFactory from "../../../Factory/DBControllerFactory";
import { PostDetails } from "../../../types/DBTypes";

const createPostOutput = {
  status: 201,
  post_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
};

const getUserPostsOutput: { status: number; data?: PostDetails[] } = {
  status: 200,
  data: [
    {
      post_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
      creator_id: "user_id",
      creator_name: "User Name",
      property_id: "Property id test",
      content: "Post Content",
      posted_at: "2024-02-29T12:00:00Z",
    },
  ],
};

const getPropertyPostsOutput: { status: number; data?: PostDetails[] } = {
  status: 200,
  data: [
    {
      post_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
      creator_id: "user_id",
      creator_name: "User Name",
      property_id: "Property id test",
      content: "Post Content",
      posted_at: "2024-02-29T12:00:00Z",
    },
  ],
};

const factoryMockSpy = jest
  .spyOn(DBControllerFactory, "createInstance")
  .mockImplementation(() => ({
    initialize: jest.fn(),
    populate: jest.fn(),
    recordExists: jest.fn(),
    createNewPublicUser: jest.fn(),
    getPublicUser: jest.fn(),
    createNewEmployee: jest.fn(),
    getEmployee: jest.fn(),
    getAllEmployees: jest.fn(),
    createNewProperty: jest.fn(),
    getProperty: jest.fn(),
    getAllProperties: jest.fn(),
    createNewUnit: jest.fn(),
    getUnit: jest.fn(),
    getOccupiedUnit: jest.fn(),
    getAllUnits: jest.fn(),
    createNewPost: jest.fn((postData) => Promise.resolve(createPostOutput)),
    getAllUserPosts: jest.fn(() => Promise.resolve(getUserPostsOutput)),
    getAllPostsReplies: jest.fn(),
    getAllPropertyPosts: jest.fn(() => Promise.resolve(getPropertyPostsOutput)),
    createNewRequest: jest.fn(),
    getRequest: jest.fn(),
    getAllEmployeeRequests: jest.fn(),
    getAllUnitRequests: jest.fn(),
    createNewEvent: jest.fn(),
    getAllEvents: jest.fn(),
    getHostEvents: jest.fn(),
    registerNewAttendee: jest.fn(),
    getAttendeeEvents: jest.fn(),
    getAttendeeList: jest.fn(),
    updateRequest: jest.fn(),
    deleteRequest: jest.fn(),
    getAdminDetails: jest.fn(),
      createPropertyOps: jest.fn(),
      getPropertyOps: jest.fn(),
      updatePropertyOps: jest.fn(),
      deletePropertyOps: jest.fn(),
    close: jest.fn(),
  }));

describe("PostsMaster", () => {
  let postController: PostsMaster;

  // Test method for error branches
  const errorHandler = (methodName: string) => {
    it("should handle errors", async () => {
      let testError = new Error("Test Error");

      switch (methodName) {
        case "createNewPost":
          jest
            .spyOn(postController.dbController, methodName)
            .mockImplementationOnce(() => {
              throw testError;
            });
          await expect(postController.createPost({
            creator_id: "user_id",
            property_id: "Property id test",
            content: "Post Content",
          })).rejects.toEqual(
            testError
          );
          break;

        case "getAllUserPosts":
          jest
            .spyOn(postController.dbController, methodName)
            .mockImplementationOnce(() => {
              throw testError;
            });
          await expect(postController.getUserPosts("user_id")).rejects.toEqual(
            testError
          );
          break;

        case "getAllPropertyPosts":
          jest
            .spyOn(postController.dbController, methodName)
            .mockImplementationOnce(() => {
              throw testError;
            });
          await expect(
            postController.getPropertyPosts("property_id")
          ).rejects.toEqual(testError);
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
        property_id: "test-prop-id",
        creator_id: "test-owner-id",
        content: "This is a test post.",
        replied_to: "",
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
      expect(
        postController.dbController.getAllPropertyPosts
      ).toHaveBeenCalled();
      expect(
        postController.dbController.getAllPropertyPosts
      ).toHaveBeenCalledWith(propertyId);
    });

    errorHandler("getAllPropertyPosts");
  });
});
