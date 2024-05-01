import AccountsMaster from "../../repo/accountsMaster";
import DBControllerFactory from "../../Factory/DBControllerFactory";
import { EmployeeData, EmployeeDetails } from "../../types/DBTypes";

jest.mock("bcryptjs", () => ({
  hash: jest.fn(() => "password456"),
  compare: jest.fn(() => Promise.resolve(true))
}));

const getPublicUserOutput = {
  status: 200,
  data: {
    account_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
    fullname: "John Doe",
    email: "john@example.com",
    password: "password456",
    phone_number: "1234567890",
    profile_picture: "profile.jpg",
    account_type: "Public"
  },
};
const getEmployeeOutput: { status: number; data: EmployeeDetails } = {
  status: 200,
  data: {
    employee_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
    fullname: "Jane Smith",
    email: "jane@example.com",
    phone_number: "51426377834",
    profile_picture: "",
    property_id: "property_id",
    type: "manager",
  },
};
const createNewPublicUserOutput = {
  status: 201,
  account_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
};
const createNewEmployeeOutput = {
  status: 201,
  employee_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
};
const getAllEmployeesOutput: { status: number; data: EmployeeDetails[] } = {
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
};

const factoryMockSpy = jest
  .spyOn(DBControllerFactory, "createInstance")
  .mockImplementation(() => ({
    initialize: jest.fn(),
    populate: jest.fn(),
    recordExists: jest.fn(),
    createNewPublicUser: jest.fn((userData) => Promise.resolve(createNewPublicUserOutput)),
    getPublicUser: jest.fn(async (email) => Promise.resolve(getPublicUserOutput)),
    createNewEmployee: jest.fn((employeeData) => Promise.resolve(createNewEmployeeOutput)),
    getEmployee: jest.fn(async (email) => Promise.resolve(getEmployeeOutput)),
    getAllEmployees: jest.fn(() => Promise.resolve(getAllEmployeesOutput)),
    createNewProperty: jest.fn(),
    getProperty: jest.fn(),
    getAllProperties: jest.fn(),
    createNewUnit: jest.fn(),
    getUnit: jest.fn(),
    getOccupiedUnit: jest.fn(),
    getAllUnits: jest.fn(),
    createNewPost: jest.fn(),
    getAllUserPosts: jest.fn(),
    getAllPostsReplies: jest.fn(),
    getAllPropertyPosts: jest.fn(),
    createNewRequest: jest.fn(),
    getRequest: jest.fn(),
    getAllEmployeeRequests: jest.fn(),
    getAllUnitRequests: jest.fn(),
    createNewEvent: jest.fn(),
    getAllEvents: jest.fn(),
    getHostEvents: jest.fn(),
    registerNewAttendee: jest.fn(),
    getAttendeeEvents: jest.fn(),
    getAttendeeList: jest.fn(),
    close: jest.fn(() => true),
    updateRequest: jest.fn(),
    deleteRequest: jest.fn(),
    getAdminDetails: jest.fn()
  }));

describe("AccountsMaster", () => {
  let accountsController: AccountsMaster;

  // Test method for error branches
  const errorHandler = (methodName: string) => {
    it("should handle errors", async () => {
      let testError = new Error("Test Error");

      switch (methodName) {
        case "getPublicUser":
          jest
            .spyOn(accountsController.dbController, methodName)
            .mockImplementationOnce(() => {
              throw testError;
            });
          await expect(
            accountsController.getUserDetails("test@example.com", "password123")
          ).rejects.toEqual(testError);
          break;
        case "getEmployee":
          jest
            .spyOn(accountsController.dbController, methodName)
            .mockImplementationOnce(() => {
              throw testError;
            });
          await expect(
            accountsController.getEmployeeDetails(
              "test@example.com",
              "password456"
            )
          ).rejects.toEqual(testError);
          break;
        case "createNewPublicUser":
          jest
            .spyOn(accountsController.dbController, methodName)
            .mockImplementationOnce(() => {
              throw testError;
            });
          await expect(accountsController.registerUser({
            fullname: "John Doe",
            email: "john@example.com",
            password: "password123",
            phone_number: "1234567890",
            profile_picture: "profile.jpg",
          })).rejects.toEqual(
            testError
          );
          break;
        case "createNewEmployee":
          jest
            .spyOn(accountsController.dbController, methodName)
            .mockImplementationOnce(() => {
              throw testError;
            });
          await expect(accountsController.registerEmployee({
            fullname: "Jane Smith",
            email: "jane@example.com",
            password: "password456",
            property_id: "property_id",
            type: "manager",
          })).rejects.toEqual(
            testError
          );
          break;
        case "getAllEmployees":
          jest
            .spyOn(accountsController.dbController, methodName)
            .mockImplementationOnce(() => {
              throw testError;
            });
          await expect(
            accountsController.getPropertyEmployees("property_id")
          ).rejects.toEqual(testError);
          break;
      }
    });
  };

  beforeEach(() => {
    accountsController = new AccountsMaster();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserDetails", () => {
    it("retrieves user details successfully", async () => {
      const email = "test@example.com";
      const password = "password123";

      const result = await accountsController.getUserDetails(email, password);
      expect(result).toEqual(getPublicUserOutput);
      expect(accountsController.dbController.getPublicUser).toHaveBeenCalled();
      expect(
        accountsController.dbController.getPublicUser
      ).toHaveBeenCalledWith(email);
    });

    errorHandler("getPublicUser");
  });

  // Add more test cases for other routes if needed
  describe("getEmployeeDetails", () => {
    it("retrieves employee details successfully", async () => {
      const email = "test@example.com";
      const password = "password456";

      const result = await accountsController.getEmployeeDetails(
        email,
        password
      );
      expect(result).toEqual(getEmployeeOutput);
      expect(accountsController.dbController.getEmployee).toHaveBeenCalled();
      expect(accountsController.dbController.getEmployee).toHaveBeenCalledWith(
        email
      );
    });

    errorHandler("getEmployee");
  });

  describe("registerUser", () => {
    it("registers a new user successfully", async () => {
      const userData = {
        fullname: "John Doe",
        email: "john@example.com",
        password: "password123",
        phone_number: "1234567890",
        profile_picture: "profile.jpg",
      };

      const result = await accountsController.registerUser(userData);
      expect(result).toEqual(createNewPublicUserOutput);
      expect(
        accountsController.dbController.createNewPublicUser
      ).toHaveBeenCalled();
      expect(
        accountsController.dbController.createNewPublicUser
      ).toHaveBeenCalledWith(userData);
    });

    errorHandler("createNewPublicUser");
  });

  describe("registerEmployee", () => {
    it("registers a new employee successfully", async () => {
      const employeeData: EmployeeData = {
        fullname: "Jane Smith",
        email: "jane@example.com",
        password: "password456",
        property_id: "property_id",
        type: "manager",
      };

      const result = await accountsController.registerEmployee(employeeData);
      expect(result).toEqual(createNewEmployeeOutput);
      expect(
        accountsController.dbController.createNewEmployee
      ).toHaveBeenCalled();
      expect(
        accountsController.dbController.createNewEmployee
      ).toHaveBeenCalledWith(employeeData);
    });

    errorHandler("createNewEmployee");
  });

  describe("getPropertyEmployees", () => {
    it("retrieves all employees for a property successfully", async () => {
      const propertyId = "property_id";

      const result = await accountsController.getPropertyEmployees(propertyId);
      expect(result).toEqual(getAllEmployeesOutput);
      expect(
        accountsController.dbController.getAllEmployees
      ).toHaveBeenCalled();
      expect(
        accountsController.dbController.getAllEmployees
      ).toHaveBeenCalledWith(propertyId);
    });

    errorHandler("getAllEmployees");
  });

  describe("Database connection close", () => {
    it("Should close the database connection successfully", () => {
      expect(accountsController.close()).toBeTruthy();
    });
  });
});
