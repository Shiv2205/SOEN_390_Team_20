const AccountsMaster = require("../Back-End/repo/accountsMaster");
const DBControllerFactory = require("../Back-End/Factory/DBControllerFactory");

jest.mock("bcryptjs", () => ({
  hash: jest.fn(() => "password456"),
}));

const getPublicUserOutput = {
  status: 200,
  data: {
    user_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
    fullname: "John Doe",
    email: "john@example.com",
    phone_number: "1234567890",
    profile_picture: "profile.jpg",
  },
};
const getEmployeeOutput = {
  status: 200,
  data: {
    employee_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
    fullname: "Jane Smith",
    email: "jane@example.com",
    password: "password456",
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
const getAllEmployeesOutput = {
  status: 200,
  data: [
    {
      employee_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
      fullname: "Jane Smith",
      email: "jane@example.com",
      password: "password456",
      property_id: "property_id",
      type: "manager",
    },
  ],
};

const factoryMockSpy = jest
  .spyOn(DBControllerFactory, "createInstance")
  .mockImplementation(() => ({
    getPublicUser: jest.fn(async (email, password) => getPublicUserOutput),
    getEmployee: jest.fn(async (email, password) => getEmployeeOutput),
    createNewPublicUser: jest.fn((userData) => createNewPublicUserOutput),
    createNewEmployee: jest.fn((employeeData) => createNewEmployeeOutput),
    getAllEmployees: jest.fn(() => getAllEmployeesOutput),
    close: jest.fn(() => true),
  }));

describe("AccountsMaster", () => {
  let accountsController;

  // Test method for error branches
  const errorHandler = (methodName) => {
    it("should handle errors", async () => {
      let testError = new Error("Test Error");
      let dbMockSpy = jest
        .spyOn(accountsController.dbController, methodName)
        .mockImplementationOnce(() => {
          throw testError;
        });

      switch (methodName) {
        case "getPublicUser":
          await expect(
            accountsController.getUserDetails("test@example.com", "password123")
          ).resolves.toEqual(testError);
          break;
        case "getEmployee":
          await expect(
            accountsController.getEmployeeDetails(
              "test@example.com",
              "password456"
            )
          ).resolves.toEqual(testError);
          break;
        case "createNewPublicUser":
          await expect(accountsController.registerUser({})).resolves.toEqual(
            testError
          );
          break;
        case "createNewEmployee":
          await expect(
            accountsController.registerEmployee({})
          ).resolves.toEqual(testError);
          break;
        case "getAllEmployees":
          await expect(
            accountsController.getPropertyEmployees("property_id")
          ).resolves.toEqual(testError);
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
      ).toHaveBeenCalledWith(email, password);
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
        email,
        password
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
        phoneNumber: "1234567890",
        profilePicture: "profile.jpg",
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
      const employeeData = {
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
  })
});
