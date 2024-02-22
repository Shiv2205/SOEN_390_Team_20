jest.mock("../../repo/accountsMaster"); // Mock AccountsMaster

const express = require("express");
const request = require("supertest"); // For easier testing with routes
const accountsRouter = require("../../routes/accounts"); // Replace with correct path
const AccountsMaster = require("../../repo/accountsMaster");

const app = express();
app.use("/accounts", accountsRouter); // Mount the router

describe("Express accounts", () => {
  let mockAccounts;

  beforeEach(() => {
    mockAccounts = new AccountsMaster();
    jest.spyOn(mockAccounts, "registerUser").mockResolvedValue("account123");
    jest
      .spyOn(mockAccounts, "getUserDetails")
      .mockResolvedValue({ status: 200, public_data: { name: "John Doe" } });
    jest
      .spyOn(mockAccounts, "registerEmployee")
      .mockResolvedValue({ success: true });
    jest
      .spyOn(mockAccounts, "getEmployeeDetails")
      .mockResolvedValue({ name: "Jane Smith" });
    jest
      .spyOn(mockAccounts, "getPropertyEmployees")
      .mockResolvedValue(["employee1", "employee2"]);
  });

  // Error-handling accounts tests
  describe("error-handling middleware", () => {
    it("should handle errors and send 500 response", async () => {
      const err = new Error("Test error");
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const next = jest.fn();

      await app.post((err, req, res, next) => {
        expect(console.error).toHaveBeenCalledWith(err.stack); // Check if error is logged
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith("Something went wrong!");
      });
    });
  });

  // /register tests
  describe("/register", () => {
    it("should register a user and return account_id", async () => {
      const req = { body: { username: "testuser" } };
      const res = { json: jest.fn() };

      await app.post("/register", (req, res) => {
        expect(mockAccounts.registerUser).toHaveBeenCalledWith(req.body);
        expect(res.json).toHaveBeenCalledWith({ account_id: "account123" });
      }); // Call the route handler
    });

    it("should handle errors and pass them to next", async () => {
      const err = new Error("Registration failed");
      mockAccounts.registerUser.mockRejectedValueOnce(err);
      const req = { body: {} };
      const res = {};
      const next = jest.fn();

      await app.post("/register", (req, res, next) => {
        expect(next).toHaveBeenCalledWith(err);
      });
    });
  });

  // /users tests
  // ... similar tests for other routes

  // /register/employee tests
  // ...

  // /employees tests
  // ...

  // /employees/property-agents tests
  // ...
});
