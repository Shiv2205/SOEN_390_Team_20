import express from "express";
import AccountsMaster from "../../repo/accountsMaster";
import request from "supertest";
import router from "../../routes/accounts";
import { EmployeeDetails, PublicUserData } from "../../types/DBTypes";

const app = express();
app.use(express.json());
app.use(router);

describe("Express route handlers", () => {
  const accountPrototype = AccountsMaster.prototype;

  const getUserOutput: {status: number; data: PublicUserData} = {
    status: 200,
    data: {
      account_id: "test-account-id",
      fullname: "John Doe",
      password: "password1",
      email: "john@example.com",
      account_type: "Public",
    }
  }

  const getEmployeeOutput: {status: number; data: EmployeeDetails} = {
    status: 202,
    data: {
      employee_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
      fullname: "Jane Smith",
      email: "jane@example.com",
      phone_number: "51426377834",
      profile_picture: "",
      property_id: "property_id",
      type: "manager",
    },
  }

  const getPropertyEmployeesOutput: {status: number; data: EmployeeDetails[]} = {
    status: 200,
    data: [
      {
        employee_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
        fullname: "Jane Smith",
        email: "jane@example.com",
        phone_number: "51426377834",
        profile_picture: "",
        property_id: "property_id",
        type: "manager",
      },
    ],
  }

  beforeEach(() => {
    jest
      .spyOn(accountPrototype, "registerUser")
      .mockResolvedValue({ status: 201, account_id: "account123" });
    jest.spyOn(accountPrototype, "getUserDetails").mockResolvedValue(getUserOutput);
    jest
      .spyOn(accountPrototype, "registerEmployee")
      .mockResolvedValue({ status: 201, employee_id: "test-employee-id" });
    jest.spyOn(accountPrototype, "getEmployeeDetails").mockResolvedValue(getEmployeeOutput);
    jest.spyOn(accountPrototype, "getPropertyEmployees").mockResolvedValue(getPropertyEmployeesOutput);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  // Error-handling
  const errorHandler = async (path: string, methodName: string) => {
    it("should handle errors and send 500 response", async () => {
      const err = new Error("Test error");
      let methodSpy;

      switch (methodName) {
        case "registerUser":
          methodSpy = jest.spyOn(accountPrototype, "registerUser");
          break;
        case "getUserDetails":
          methodSpy = jest.spyOn(accountPrototype, "getUserDetails");
          break;
        case "registerEmployee":
          methodSpy = jest.spyOn(accountPrototype, "registerEmployee");
          break;
        case "getEmployeeDetails":
          methodSpy = jest.spyOn(accountPrototype, "getEmployeeDetails");
          break;
        default:
          methodSpy = jest.spyOn(accountPrototype, "getPropertyEmployees");
          break;
      }

      methodSpy.mockImplementationOnce(() => {
        return Promise.resolve(err);
      });

      let response = await request(app).post(path);
      expect(response.status).toEqual(500);
      expect(response.body.message).toEqual("Test error");
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
      expect(response.body).toEqual(getUserOutput);
      expect(accountPrototype.getUserDetails).toHaveBeenCalledWith(
        req.body.email,
        req.body.password
      );
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
          type: "test type",
        },
      };

      const response = await request(app)
        .post("/register/employee")
        .send(req.body);
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
      expect(response.body).toEqual(getEmployeeOutput);
      expect(accountPrototype.getEmployeeDetails).toHaveBeenCalledTimes(1);
    });

    errorHandler("/employees", "getEmployeeDetails");
  });

  // /employees/property-agents tests
  describe("/employees/property-agents", () => {
    it("should get property employees", async () => {
      let req = {
        body: {
          property_id: "test-property-id",
        },
      };
      const response = await request(app)
        .post("/employees/property-agents")
        .send(req.body);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(getPropertyEmployeesOutput);
      expect(accountPrototype.getPropertyEmployees).toHaveBeenCalledTimes(1);
      expect(accountPrototype.getPropertyEmployees).toHaveBeenCalledWith(
        req.body.property_id
      );
    });

    errorHandler("/employees/property-agents", "getPropertyEmployees");
  });
});
