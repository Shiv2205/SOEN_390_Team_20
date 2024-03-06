const PropertyMaster = require("../Back-End/repo/propertyMaster");
const DBControllerFactory = require("../Back-End/Factory/DBControllerFactory");

const createNewPropertyOutput = {
    status: 201,
    property_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
  };
const getPropertyOutput = {
    status: 202,
    data: {
      property_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
      unit_count: 20,
      locker_count: 10,
      parking_count: 50,
      address: "123 Main St",
      picture: "main_street.jpg",
    },
  };
const getAllPropertiesOutput = {
    status: 200,
    data: [
      {
        property_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
        unit_count: 20,
        locker_count: 10,
        parking_count: 50,
        address: "123 Main St",
        picture: "main_street.jpg",
      },
    ],
  };

const factoryMockSpy = jest
  .spyOn(DBControllerFactory, "createInstance")
  .mockImplementation(() => ({
    createNewProperty: jest.fn((mockData) => (createNewPropertyOutput)),
    getProperty: jest.fn((property_id) => (getPropertyOutput)),
    getAllProperties: jest.fn(() => (getAllPropertiesOutput)),
  }));

describe("PropertyMaster", () => {
  let propertyController;

  //Test method for error branches
  const errorHandler = (methodName) => {
    it("should handle errors", async () => {
      let testError = new Error("Test Error");
      let dbMockSpy = jest
        .spyOn(propertyController.dbController, methodName)
        .mockImplementationOnce(() => {
          throw testError;
        });

      switch (methodName) {
        case "createNewProperty":
          await expect(
            propertyController.registerNewProperty({})
          ).resolves.toEqual(testError);
          break;
        case "getProperty":
          await expect(propertyController.getProperty({})).resolves.toEqual(
            testError
          );
          break;
        case "getAllProperties":
          await expect(
            propertyController.getAllProperties({})
          ).resolves.toEqual(testError);
          break;
      }
    });
  };

  beforeEach(() => {
    propertyController = new PropertyMaster();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("registerNewProperty", () => {
    it("registers a new property successfully", async () => {
      const mockData = {
        unit_count: 20,
        locker_count: 10,
        parking_count: 50,
        address: "123 Main St",
        picture: "main_street.jpg",
      };

      let propertySpy = jest.spyOn(propertyController, "registerNewProperty");

      const result = await propertyController.registerNewProperty(mockData);
      expect(result).toEqual(createNewPropertyOutput);
      expect(propertySpy).toHaveBeenCalledWith(mockData);
      expect(
        propertyController.dbController.createNewProperty
      ).toHaveBeenCalled();
      expect(
        propertyController.dbController.createNewProperty
      ).toHaveBeenCalledWith(mockData);
    });

    errorHandler("createNewProperty");
  });

  // Add more test cases for other routes if needed
  describe("getProperty", () => {
    it("retrieves property data successfully", async () => {
      const mockData = { property_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990" };

      let propertySpy = jest.spyOn(propertyController, "getProperty");

      let result = await propertyController.getProperty(mockData.property_id);
      expect(result).toEqual(getPropertyOutput);
      expect(propertySpy).toHaveBeenCalledWith(mockData.property_id);
      expect(propertyController.dbController.getProperty).toHaveBeenCalled();
      expect(propertyController.dbController.getProperty).toHaveBeenCalledWith(
        mockData.property_id
      );
    });

    errorHandler("getProperty");
  });

  describe("getAllProperties", () => {
    it("retrieves all company assets successfully", async () => {
      const mockData = { employee_id: "10e6d4f0-8476-431b-b39a-5e35e2a1b1db" };

      let propertySpy = jest.spyOn(propertyController, "getAllProperties");

      let result = await propertyController.getAllProperties(
        mockData.employee_id
      );
      expect(result).toEqual(getAllPropertiesOutput);
      expect(propertySpy).toHaveBeenCalled();
      expect(propertySpy).toHaveBeenCalledWith(mockData.employee_id);
      expect(
        propertyController.dbController.getAllProperties
      ).toHaveBeenCalled();
      expect(
        propertyController.dbController.getAllProperties
      ).toHaveBeenCalledWith(mockData.employee_id);
    });

    errorHandler("getAllProperties");
  });
});
