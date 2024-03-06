const UnitMaster = require("../Back-End/repo/unitMaster");
const DBControllerFactory = require("../Back-End/Factory/DBControllerFactory");

const createUnitOutput = {
  status: 201,
  unit_id: "a2e6634e-c063-4cf3-acc4-a03154498694",
};
const getUnitOutput = {
  status: 202,
  data: {
    unit_id: "a2e6634e-c063-4cf3-acc4-a03154498694",
    property_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
    size: 20,
    monthly_rent: 1700,
    condo_fee: 5200,
    condo_balance: 200000,
    owner_id: "",
    renter_id: "",
  },
};
const getAllUnitsOutput = {
  status: 200,
  data: [
    {
      unit_id: "1d91a7cd-893d-4944-9c31-c4c0136f1844",
      property_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
      size: 1000,
      monthly_rent: 1200,
      condo_fee: 150,
      condo_balance: 500,
      owner_id: "201",
      renter_id: "301",
    },
    {
      unit_id: "a2e6634e-c063-4cf3-acc4-a03154498694",
      property_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
      size: 20,
      monthly_rent: 1700,
      condo_fee: 5200,
      condo_balance: 200000,
      owner_id: "",
      renter_id: "",
    },
  ],
};

const factoryMockSpy = jest
  .spyOn(DBControllerFactory, "createInstance")
  .mockImplementation(() => ({
    createNewUnit: jest.fn((mockData) => createUnitOutput),
    getUnit: jest.fn((unit_id) => getUnitOutput),
    getAllUnits: jest.fn(() => getAllUnitsOutput),
  }));

describe("UnitMaster", () => {
  let unitController;

  // Test method for error branches
  const errorHandler = (methodName) => {
    it("should handle errors", async () => {
      let testError = new Error("Test Error");
      let dbMockSpy = jest
        .spyOn(unitController.dbController, methodName)
        .mockImplementationOnce(() => {
          throw testError;
        });

      switch (methodName) {
        case "createNewUnit":
          await expect(unitController.registerUnit({})).resolves.toEqual(
            testError
          );
          break;
        case "getUnit":
          await expect(unitController.getUnit({})).resolves.toEqual(testError);
          break;
        case "getAllUnits":
          await expect(unitController.getPropertyUnits({})).resolves.toEqual(
            testError
          );
          break;
      }
    });
  };

  beforeEach(() => {
    unitController = new UnitMaster();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("registerUnit", () => {
    it("registers a new unit successfully", async () => {
      const mockData = {
        property_id: "test-prop-id",
        size: 100,
        monthly_rent: 1000,
        condo_fee: 1200,
        condo_balance: 3579,
      };

      let unitSpy = jest.spyOn(unitController, "registerUnit");

      const result = await unitController.registerUnit(mockData);
      expect(result).toEqual(createUnitOutput);
      expect(unitSpy).toHaveBeenCalledWith(mockData);
      expect(unitController.dbController.createNewUnit).toHaveBeenCalled();
      expect(unitController.dbController.createNewUnit).toHaveBeenCalledWith({
        ...mockData,
        owner_id: "",
        renter_id: "",
        owner_registration_key: "",
        renter_registration_key: "",
      });
    });

    errorHandler("createNewUnit");
  });

  // Add more test cases for other routes if needed
  describe("getUnit", () => {
    it("retrieves unit data successfully", async () => {
      const mockData = { unit_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990" };

      let unitSpy = jest.spyOn(unitController, "getUnit");

      let result = await unitController.getUnit(mockData.unit_id);
      expect(result).toEqual(getUnitOutput);
      expect(unitSpy).toHaveBeenCalledWith(mockData.unit_id);
      expect(unitController.dbController.getUnit).toHaveBeenCalled();
      expect(unitController.dbController.getUnit).toHaveBeenCalledWith(
        mockData.unit_id
      );
    });

    errorHandler("getUnit");
  });

  describe("getPropertyUnits", () => {
    it("retrieves all units for a property successfully", async () => {
      const mockData = { property_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990" };

      let unitSpy = jest.spyOn(unitController, "getPropertyUnits");

      let result = await unitController.getPropertyUnits(mockData.property_id);
      expect(result).toEqual(getAllUnitsOutput);
      expect(unitSpy).toHaveBeenCalled();
      expect(unitSpy).toHaveBeenCalledWith(mockData.property_id);
      expect(unitController.dbController.getAllUnits).toHaveBeenCalled();
      expect(unitController.dbController.getAllUnits).toHaveBeenCalledWith(
        mockData.property_id
      );
    });

    errorHandler("getAllUnits");
  });
});
