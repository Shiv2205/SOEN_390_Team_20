const express = require("express");
const router = require("../../routes/nested_routes/posts"); // Adjust the path as per your project structure
jest.mock("../../repo/postsMaster");
const PostsMaster = require("../../repo/postsMaster");
const request = require("supertest");

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
  const errorHandler = async (path, methodName) => {
    it("should handle errors and send 500 response", async () => {
      const err = new Error("Test error");
      let tempPrototype = PostsMaster.prototype;
      jest.spyOn(tempPrototype, `${methodName}`).mockReturnValue(err);

      let response = await request(app).post(`${path}`);
      expect(response.status).toEqual(500);
      expect(response.body.error).toEqual("Internal Server Error");
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

      const result = { status: 201, data:  {
        id: "1",
        title: "Test Post",
        content: "This is a test post.",
        creator_id: "12345678-1234-1234-1234-123456789012",
      }};

      jest.spyOn(postsPrototype, "createPost").mockResolvedValue(result);

      let response = await request(app).post("/create").send(mockReq.body);
      expect(response.body.data).toEqual({
        id: "1",
        title: "Test Post",
        content: "This is a test post.",
        creator_id: "12345678-1234-1234-1234-123456789012",
      });
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

      const posts = [
        {
          id: "1",
          title: "Test Post 1",
          content: "This is a test post 1.",
          creator_id: "12345678-1234-1234-1234-123456789012",
        },
        {
          id: "2",
          title: "Test Post 2",
          content: "This is a test post 2.",
          creator_id: "12345678-1234-1234-1234-123456789012",
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

      const posts = [
        {
          id: "1",
          title: "Test Post 1",
          content: "This is a test post 1.",
          creator_id: "12345678-1234-1234-1234-123456789012",
          property_id: "12345678-1234-1234-1234-123456789012",
        },
        {
          id: "2",
          title: "Test Post 2",
          content: "This is a test post 2.",
          creator_id: "12345678-1234-1234-1234-123456789012",
          property_id: "12345678-1234-1234-1234-123456789012",
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