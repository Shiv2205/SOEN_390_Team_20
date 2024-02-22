jest.mock("../../repo/accountsMaster"); // Mock the AccountsMaster dependency

const express = require("express");
const router = require("../../routes/login"); // Replace with actual path
const AccountsMaster = require("../../repo/accountsMaster");

describe("Login middleware", () => {
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

  // --- Test: Successful login ---
  it("should send 202 and login data on successful login", async () => {
    mockReq.body = { email: "michael@example.com", password: "password6" };
    const mockUserDetails = {
      status: 202,
      public_data: {
        account_id: "6e8f4b3c-4103-44b3-b694-cb9f6e3e3fc9",
        fullname: "Michael Wilson",
        email: "michael@example.com",
        phone_number: "6543217890",
        profile_picture: "https://randomuser.me/api/portraits/men/3.jpg",
        account_type: "Renter",
      },
    };
    AccountsMaster.mockReturnValue({
      getUserDetails: jest.fn().mockResolvedValue(mockUserDetails),
    });

    await router.post("/", (mockReq, mockRes, mockNext) => {
      expect(AccountsMaster.getUserDetails).toHaveBeenCalledWith(
        "michael@example.com",
        "password6"
      );
      expect(mockRes.status).toHaveBeenCalledWith(202);
      expect(mockRes.send).toHaveBeenCalledWith({
        response: "User logged in successfully!",
        loginData: {
          account_id: "6e8f4b3c-4103-44b3-b694-cb9f6e3e3fc9",
          fullname: "Michael Wilson",
          email: "michael@example.com",
          phone_number: "6543217890",
          profile_picture: "https://randomuser.me/api/portraits/men/3.jpg",
          account_type: "Renter",
        },
      });
    });
  });

  // --- Test: Failed login ---
  it("should send error status and message on failed login", async () => {
    mockReq.body = { email: "invalid", password: "wrong" };
    const mockErrorStatus = 401;
    const mockErrorMessage = "Invalid credentials";
    AccountsMaster.mockReturnValue({
      getUserDetails: jest.fn().mockResolvedValue({
        status: mockErrorStatus,
        message: mockErrorMessage,
      }),
    });

    await router.post("/", (mockReq, mockRes, mockNext) => {
      expect(AccountsMaster.getUserDetails).toHaveBeenCalledWith(
        "invalid",
        "wrong"
      );
      expect(mockRes.status).toHaveBeenCalledWith(mockErrorStatus);
      expect(mockRes.send).toHaveBeenCalledWith({
        status: mockErrorStatus,
        message: mockErrorMessage,
      });
    });
  });

  // --- Test: Error handling ---
  it("should send 500 and error message on internal error", async () => {
    mockReq.body = { email: "test", password: "test" };
    AccountsMaster.mockReturnValue({
      getUserDetails: jest.fn().mockRejectedValue(new Error("Database error")),
    });

    await router.post("/", (mockReq, mockRes, mockNext) => {
      expect(AccountsMaster.getUserDetails).toHaveBeenCalledWith(
        "test",
        "test"
      );
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith({ response: "Database error" });
    });
  });
});
