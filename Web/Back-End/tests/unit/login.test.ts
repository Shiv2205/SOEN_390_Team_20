import express, { Request, Response, NextFunction, Router } from "express";
import request from "supertest";
import router from "../../routes/login"; // Update this with your router file name
import AccountsMaster from "../../repo/accountsMaster";

const app = express();
app.use(express.json());
app.use(router);

const accountsMasterMock = jest.mock("../../repo/accountsMaster", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      registerUser: jest.fn(),
      getUserDetails: jest.fn((email: string, password: string) => ({
        status: 202,
        data: { account_id: "6e8f4b3c-4103-44b3-b694-cb9f6e3e3fc9" },
      })),
      registerEmployee: jest.fn(),
      getEmployeeDetails: jest.fn(),
      getPropertyEmployees: jest.fn(),
    })),
  };
});

describe("Login middleware", () => {
  let accountPrototype: jest.Mocked<AccountsMaster>;

  beforeEach(() => {
    //
    accountPrototype = AccountsMaster.prototype as jest.Mocked<AccountsMaster>;
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
    let accountsSpy = jest.spyOn(accountPrototype, "getUserDetails");
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
    const mockErrorStatus = 500;
    const mockErrorMessage = "Invalid credentials";
    let tempPrototype = AccountsMaster.prototype as jest.Mocked<AccountsMaster>;

    jest.spyOn(tempPrototype, "getUserDetails").mockImplementationOnce(() => {
      throw new Error(mockErrorMessage);
    });

    const response = await request(app).post("/").send(req.body);
    expect(tempPrototype.getUserDetails).toHaveBeenCalledWith(
      "invalid",
      "wrong"
    );
    console.log("test passes");
    expect(response.status).toEqual(mockErrorStatus);
    expect(response.body).toEqual({
      response: mockErrorMessage,
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
