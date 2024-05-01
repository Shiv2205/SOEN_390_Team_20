import express from "express";
import request from "supertest";
import router from "../../../routes/nested_routes/posts";
import PostsMaster from "../../../repo/postsMaster";
import { PostDetails, UnitDetails } from "../../../types/DBTypes";

const app = express();
app.use(express.json());
app.use(router);

describe("Posts Router", () => {
  const postsPrototype = PostsMaster.prototype;

  beforeEach(() => {
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Error-handling
  const errorHandler = async (path: string, methodName: string) => {
    it("should handle errors and send 500 response", async () => {
      const err = new Error("Test Error");
      let tempPrototype = PostsMaster.prototype;
      let methodSpy;

      switch (methodName) {
        case "createPost":
          methodSpy = jest.spyOn(tempPrototype, "createPost");
          break;
        case "getPropertyPosts":
          methodSpy = jest.spyOn(tempPrototype, "getPropertyPosts");
          break;
        default:
          methodSpy = jest.spyOn(tempPrototype, "getUserPosts");
          break;
      }

      methodSpy.mockResolvedValue(err);

      let response = await request(app).post(path);
      expect(response.status).toEqual(500);
      expect(response.body.message).toEqual("Test Error");
    });
  };

  describe("POST /create", () => {
    it("creates a new post successfully", async () => {
      const mockReq = {
        body: {
          property_id: "Test Post",
          content: "This is a test post.",
          creator_id: "12345678-1234-1234-1234-123456789012",
        },
      };

      const result = { status: 201, post_id: "123"};

      jest.spyOn(postsPrototype, "createPost").mockResolvedValue(result);

      let response = await request(app).post("/create").send(mockReq.body);
      expect(response.body).toEqual(result);
      expect(response.status).toEqual(201);
      expect(postsPrototype.createPost).toHaveBeenCalledWith(mockReq.body);
    });

    errorHandler("/create", "createPost");
  });

  describe("POST /user-posts", () => {
    it("retrieves user posts successfully", async () => {
      const mockReq = {
        body: { creator_id: "12345678-1234-1234-1234-123456789012" },
      };

      const posts: PostDetails[] = [
        {
          property_id: "test-prop-id",
          creator_id: "test-creator-id",
          creator_name: "User Name",
          content: "test constent",
          post_id: "test-port-id",
          posted_at: "test-timestamp",
        },
        {
          property_id: "test-prop-id-2",
          creator_id: "test-creator-id-2",
          creator_name: "User Name",
          content: "test constent 2",
          post_id: "test-port-id-2",
          posted_at: "test-timestamp-2",
        },
      ];

      jest
        .spyOn(postsPrototype, "getUserPosts")
        .mockResolvedValue({status: 200, data: posts});

      let response = await request(app).post("/user-posts").send(mockReq.body);
      expect(response.body.data).toEqual(posts);
      expect(response.status).toEqual(200);
      expect(postsPrototype.getUserPosts).toHaveBeenCalledWith(
        mockReq.body.creator_id
      );
    });

    errorHandler("/user-posts", "getUserPosts");
  });

  describe("POST /property-channel-posts", () => {
    it("retrieves property channel posts successfully", async () => {
      const mockReq = {
        body: { property_id: "12345678-1234-1234-1234-123456789012" },
      };

      const posts: PostDetails[] = [
        {
          property_id: "test-prop-id",
          creator_id: "test-creator-id",
          content: "test constent",
          creator_name: "User Name",
          post_id: "test-port-id",
          posted_at: "test-timestamp",
        },
        {
          property_id: "test-prop-id-2",
          creator_id: "test-creator-id-2",
          creator_name: "User Name",
          content: "test constent 2",
          post_id: "test-port-id-2",
          posted_at: "test-timestamp-2",
        },
      ];

      jest
        .spyOn(postsPrototype, "getPropertyPosts")
        .mockResolvedValue({status: 200, data: posts});

      let response = await request(app)
        .post("/property-channel-posts")
        .send(mockReq.body);
      expect(response.body.data).toEqual(posts);
      expect(response.status).toEqual(200);
      expect(postsPrototype.getPropertyPosts).toHaveBeenCalledWith(
        mockReq.body.property_id
      );
    });

    errorHandler("/property-channel-posts", "getPropertyPosts");
  });
});