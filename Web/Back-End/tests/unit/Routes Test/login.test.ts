import express from "express";
import request from "supertest";
import router from "../../../routes/login"; // Update this with your router file name
import AccountsMaster from "../../../repo/accountsMaster";

const app = express();
app.use(express.json());
app.use(router);

describe("Login middleware", () => {
  const accountPrototype = AccountsMaster.prototype;

  beforeEach(() => {
    //
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
    let res = {
      status: 202,
      data: {
        account_id: "6e8f4b3c-4103-44b3-b694-cb9f6e3e3fc9",
        fullname: "Michael Scott",
        password: "password6",
        email: "michael@example.com",
        account_type: "Public",
      },
    }

    jest
      .spyOn(accountPrototype, "getUserDetails")
      .mockResolvedValueOnce(res);

    const response = await request(app).post("/").send(req.body);

    expect(accountPrototype.getUserDetails).toHaveBeenCalledWith(
      "michael@example.com",
      "password6"
    );
    expect(response.status).toEqual(res.status);
    expect(response.body).toEqual({
      response: "User logged in successfully!",
      loginData: res.data,
    });
  });

  // --- Test: Failed login ---
  it("should send error status and message on failed login", async () => {
    let req = { body: { email: "invalid", password: "wrong" } };
    const mockErrorStatus = 500;
    const mockErrorMessage = "Invalid credentials";

    jest.spyOn(accountPrototype, "getUserDetails").mockRejectedValueOnce(new Error(mockErrorMessage));

    const response = await request(app).post("/").send(req.body);
    expect(accountPrototype.getUserDetails).toHaveBeenCalledWith(
      "invalid",
      "wrong"
    );
    expect(response.status).toEqual(mockErrorStatus);
    expect(response.body).toEqual({
      response: mockErrorMessage,
    });
  });

  // --- Test: Errors thrown ---
  it("Should send a status 500 with an error message", async () => {
    let req = { body: { email: "Test", password: "Error" } };
    const mockErrorStatus = 500;
    const mockErrorMessage = "Invalid credentials";
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
