jest.mock("../../repo/accountsMaster");
const router = require("../../routes/signup");
const AccountsMaster = require("../../repo/accountsMaster");
const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.json());
app.use(router);

describe("Signup middleware", () => {
  const accountPrototype = AccountsMaster.prototype;

  beforeEach(() => {});

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

  // --- Test: Successful registration ---
  it("should send 201 and success message on successful registration", async () => {
    let req = {
      body: {
        name: "John Doe",
        email: "test@example.com",
        password: "password",
      },
    };

    jest.spyOn(accountPrototype, "registerUser").mockResolvedValue({
      status: 201,
      account_id: "6e8f4b3c-4103-44b3-b694-cb9f6e3e3fc9",
    });

    const response = await request(app).post("/").send(req.body);
    expect(accountPrototype.registerUser).toHaveBeenCalledWith(req.body);
    expect(response.status).toEqual(201);
    expect(response.body).toEqual({
      response: "User added successfully!",
    });
  });

  // --- Test: already registered (from database) ---
  it("should send error status and message from database on existing user", async () => {
    let req = {
      body: { name: "Jane Smith", email: "invalid", password: "weak" },
    };

    jest
      .spyOn(accountPrototype, "registerUser")
      .mockResolvedValue({ status: 400, message: "User already resgistered!" });

    const response = await request(app).post("/").send(req.body);
    expect(accountPrototype.registerUser).toHaveBeenCalledWith(req.body);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      response: "User already resgistered!",
    });
  });
});
