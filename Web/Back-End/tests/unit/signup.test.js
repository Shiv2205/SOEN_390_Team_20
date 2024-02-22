jest.mock("../../repo/accountsMaster"); // Mock the accountsMaster dependency

const express = require("express");
const router = require("../../routes/signup"); // Replace with actual path
const accountsMaster = require("../../repo/accountsMaster");

describe("Signup middleware", () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // --- Test: Empty request body ---
  it("should send 400 if request body is empty", async () => {
    mockReq.body = {};

    await router.post("/", (mockReq, mockRes, mockNext) => {
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.send).toHaveBeenCalledWith({
        response: "Data not received",
      });
    });
  });

  // --- Test: Successful registration ---
  it("should send 201 and success message on successful registration", async () => {
    mockReq.body = {
      name: "John Doe",
      email: "test@example.com",
      password: "password",
    };
    const mockDbResponse = { status: 201, message: "User added successfully!" };
    accountsMaster.mockReturnValue({
      registerUser: jest.fn().mockResolvedValue(mockDbResponse),
    });

    await router.post("/", (mockReq, mockRes, mockNext) => {
      expect(accountsMaster.registerUser).toHaveBeenCalledWith(mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalledWith({
        response: "User added successfully!",
      });
    });
  });

  // --- Test: Failed registration (from database) ---
  it("should send error status and message from database on failed registration", async () => {
    mockReq.body = { name: "Jane Smith", email: "invalid", password: "weak" };
    const mockErrorStatus = 409;
    const mockErrorMessage = "Email already exists";
    accountsMaster.mockReturnValue({
      registerUser: jest.fn().mockResolvedValue({
        status: mockErrorStatus,
        message: mockErrorMessage,
      }),
    });

    await router.post("/", (mockReq, mockRes, mockNext) => {
      expect(accountsMaster.registerUser).toHaveBeenCalledWith(mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(mockErrorStatus);
      expect(mockRes.send).toHaveBeenCalledWith({
        response: mockErrorMessage,
      });
    });
  });

  // --- Test: Error handling ---
  it("should send 500 and error message on internal error", async () => {
    mockReq.body = { name: "Test User", email: "test", password: "test" };
    accountsMaster.mockReturnValue({
      registerUser: jest.fn().mockRejectedValue(new Error("Database error")),
    });

    await router.post("/", (mockReq, mockRes, mockNext) => {
      expect(accountsMaster.registerUser).toHaveBeenCalledWith(mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ response: "Database error" });
    });
  });
});
