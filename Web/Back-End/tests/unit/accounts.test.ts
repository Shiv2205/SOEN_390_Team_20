import express, { Request, Response, NextFunction, Router } from "express";
import request from "supertest";
import router from "../../routes/accounts"; // Update this with your router file name

const app = express();
app.use(express.json());
app.use(router);

jest.mock("../../repo/accountsMaster", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      registerUser: jest.fn(),
      getUserDetails: jest.fn(),
      registerEmployee: jest.fn(),
      getEmployeeDetails: jest.fn(),
      getPropertyEmployees: jest.fn(),
    })),
  };
});

describe("Express route handlers", () => {
  beforeEach(() => {
    // Reset all mocked functions before each test
    jest.clearAllMocks();
  });

  // Test the /register route
  describe("POST /register", () => {
    it("should handle registration", async () => {
      // Mock data
      const userData = {
        fullname: "John Doe",
        email: "john@example.com",
        password: "password",
      };

      // Mock the registerUser function
      router.post("/register", async (req: Request, res: Response) => {
        res.status(200).json({ success: true });
      });

      // Send request
      const response = await request(app).post("/register").send(userData);

      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: true });
    });
  });

  // Test other routes similarly...
});
