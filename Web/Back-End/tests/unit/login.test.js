jest.mock("../../repo/accountsMaster"); // Mock the AccountsMaster dependency
const router = require("../../routes/login");
const AccountsMaster = require("../../repo/accountsMaster");
const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.json());
app.use(router);

describe("Login middleware", () => {
  const accountPrototype = AccountsMaster.prototype;

  beforeEach(() => {
    jest.spyOn(accountPrototype, "getUserDetails").mockResolvedValue({
      status: 202,
      data: { account_id: "6e8f4b3c-4103-44b3-b694-cb9f6e3e3fc9" },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // --- Test: Empty request body ---
  it("should send 400 if request body is empty", async () => {
    const response = await request(app).post("/").send({});
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      response: "Data not received",
    });
  });

  // --- Test: Successful login ---
  it("should send 202 and login data on successful login", async () => {
    let req = { body: { email: "michael@example.com", password: "password6" } };

    const response = await request(app).post("/").send(req.body);
    expect(accountPrototype.getUserDetails).toHaveBeenCalledWith(
      "michael@example.com",
      "password6"
    );
    expect(response.status).toEqual(202);
    expect(response.body).toEqual({
      response: "User logged in successfully!",
      loginData: { account_id: "6e8f4b3c-4103-44b3-b694-cb9f6e3e3fc9" },
    });
  });

  // --- Test: Failed login ---
  it("should send error status and message on failed login", async () => {
    let req = { body: { email: "invalid", password: "wrong" } };
    const mockErrorStatus = 401;
    const mockErrorMessage = "Invalid credentials";
    let tempPrototype = AccountsMaster.prototype;

    jest.spyOn(tempPrototype, "getUserDetails").mockResolvedValue({
      status: mockErrorStatus,
      message: mockErrorMessage,
    });

    const response = await request(app).post("/").send(req.body);
    expect(tempPrototype.getUserDetails).toHaveBeenCalledWith(
      "invalid",
      "wrong"
    );
    expect(response.status).toEqual(mockErrorStatus);
    expect(response.body).toEqual({
      status: mockErrorStatus,
      message: mockErrorMessage,
    });
  });

  // --- Test: Errors thrown ---
  it("Should send a status 500 with an error message", async () => {
    let req = { body: { email: "Test", password: "Error" } };
    const mockErrorStatus = 500;
    const mockErrorMessage = "Test Error";
    let testError = new Error(mockErrorMessage);
    let spy = jest
      .spyOn(accountPrototype, "getUserDetails")
      .mockImplementationOnce(() => {
        throw testError;
      });

    const response = await request(app).post("/").send(req.body);
    expect(accountPrototype.getUserDetails).toHaveBeenCalledWith(
      req.body.email,
      req.body.password
    );
    expect(response.status).toEqual(mockErrorStatus);
    expect(response.body).toEqual({
      response: mockErrorMessage,
    });
  });
});
