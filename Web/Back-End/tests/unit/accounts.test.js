jest.mock("../../repo/accountsMaster"); // Mock AccountsMaster
const router = require("../../routes/accounts");
const request = require("supertest");
const AccountsMaster = require("../../repo/accountsMaster");

const express = require("express");
const app = express();

app.use(express.json());
app.use(router);

describe("Express accounts", () => {
  const accountPrototype = AccountsMaster.prototype;

  beforeEach(() => {
    jest
      .spyOn(accountPrototype, "registerUser")
      .mockResolvedValue({ status: 201, account_id: "account123" });
    jest
      .spyOn(accountPrototype, "getUserDetails")
      .mockResolvedValue({ status: 200, public_data: { name: "John Doe" } });
    jest
      .spyOn(accountPrototype, "registerEmployee")
      .mockResolvedValue({ status: 201, employee_id: "test-employee-id" });
    jest.spyOn(accountPrototype, "getEmployeeDetails").mockResolvedValue({
      status: 202,
      data: { employee_id: "1d389ee6-41c2-4b7e-b0c2-4b241d7d3cf4" },
    });
    jest
      .spyOn(accountPrototype, "getPropertyEmployees")
      .mockResolvedValue({ status: 200, data: ["employee1", "employee2"] });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Error-handling
  const errorHandler = async (path, methodName) => {
    it("should handle errors and send 500 response", async () => {
      const err = new Error("Test error");

      jest.spyOn(accountPrototype, `${methodName}`).mockReturnValue(err);

      let response = await request(app).post(`${path}`);
      expect(response.status).toEqual(500);
      expect(response.body.message).toEqual("Something went wrong!");
    });
  };

  // /register tests
  describe("/register", () => {
    it("should register a user and return account_id", async () => {
      let req = {
        body: {
          fullname: "test user",
          email: "testuser@example.com",
          password: "testPassword",
        },
      };

      const response = await request(app).post("/register").send(req.body);
      expect(response.status).toEqual(201);
      expect(response.body).toEqual({
        status: 201,
        account_id: "account123",
      });
      expect(accountPrototype.registerUser).toHaveBeenCalledWith(req.body);
      expect(accountPrototype.registerUser).toHaveBeenCalledTimes(1);
    });

    errorHandler("/register", "registerUser");
  });

  // /users tests
  describe("/users", () => {
    it("should get user details", async () => {
      let req = {
        body: {
          email: "testuser@example.com",
          password: "testPassword",
        },
      };

      const response = await request(app).post("/users").send(req.body);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        status: 200,
        public_data: { name: "John Doe" },
      });
      expect(accountPrototype.getUserDetails).toHaveBeenCalledWith(req.body.email, req.body.password);
      expect(accountPrototype.getUserDetails).toHaveBeenCalledTimes(1);
    });

    errorHandler("/users", "getUserDetails");
  });

  // /register/employee tests
  describe("/register/employee", () => {
    it("should register an employee and return employee_id", async () => {
      const req = {
        body: {
          fullname: "test employee",
          email: "testemployee@example.com",
          password: "testEmployeePassword",
          type: "test type"
        },
      };

      const response = await request(app).post("/register/employee").send(req.body);
      expect(accountPrototype.registerEmployee).toHaveBeenCalledWith(req.body);
      expect(response.status).toEqual(201);
      expect(response.body).toEqual({
        status: 201,
        employee_id: "test-employee-id",
      });
    });

    errorHandler("/register/employee", "registerEmployee");
  });

  // /employees tests
  describe("/employees", () => {
    it("should get employee details", async () => {
      let req = {
        body: {
          email: "testuser@example.com",
          password: "testPassword",
        },
      };
      const response = await request(app).post("/employees").send(req.body);
      expect(response.status).toEqual(202);
      expect(response.body).toEqual({
        status: 202,
        data: { employee_id: "1d389ee6-41c2-4b7e-b0c2-4b241d7d3cf4" },
      });
      expect(accountPrototype.getEmployeeDetails).toHaveBeenCalledTimes(1);
    });

    errorHandler("/employees", "getEmployeeDetails");
  });

  // /employees/property-agents tests
  describe("/employees/property-agents", () => {
    it("should get property employees", async () => {
      let req = {
        body: {
          property_id: "test-property-id"
        },
      };
      const response = await request(app).post("/employees/property-agents").send(req.body);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        status: 200,
        data: ["employee1", "employee2"],
      });
      expect(accountPrototype.getPropertyEmployees).toHaveBeenCalledTimes(1);
      expect(accountPrototype.getPropertyEmployees).toHaveBeenCalledWith(req.body.property_id);
    });

    errorHandler("/employees/property-agents", "getPropertyEmployees");
  });
});
