const express = require("express");
const router = require("../Back-End/routes/properties");
jest.mock("../../repo/propertyMaster");
const PropertyMaster = require("../Back-End/repo/propertyMaster");
const request = require("supertest");

const app = express();
app.use(express.json());
app.use(router);

describe("Properties Router", () => {
  const propertyPrototype = PropertyMaster.prototype;

  // beforeEach(() => {

  // });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Error-handling
  const errorHandler = async (path, methodName) => {
    it("should handle errors and send 500 response", async () => {
      const err = new Error("Test error");

      jest.spyOn(propertyPrototype, `${methodName}`).mockImplementationOnce(() => {throw err});

      let response = await request(app).post(`${path}`);
      expect(response.status).toEqual(500);
      expect(response.body.message).toEqual("Something went wrong!");
    });
  };

  describe("POST /register", () => {
    it("registers a new property successfully", async () => {
      const mockReq = {
        body: {
          unit_count: 20,
          locker_count: 10,
          parking_count: 50,
          address: "123 Main St",
          picture: "main_street.jpg",
        },
      };

      jest.spyOn(propertyPrototype, "registerNewProperty").mockResolvedValue({
        status: 201,
        property_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
      });

      let response = await request(app).post("/register").send(mockReq.body);
      expect(response.body).toEqual({
        status: 201,
        property_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990",
      });
      expect(response.status).toEqual(201);
      expect(propertyPrototype.registerNewProperty).toHaveBeenCalledWith(
        mockReq.body
      );
    });

    errorHandler("/register", "registerNewProperty");
  });

  // Add more test cases for other routes if needed
  describe("POST /real-estate", () => {
    it("retrieves property data successfully", async () => {
      const mockReq = {
        body: { property_id: "1d2b6c84-2b4c-4893-8fb6-cf76f255d990" },
      };

      const propertyData = {
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

      jest
        .spyOn(propertyPrototype, "getProperty")
        .mockResolvedValue(propertyData);

      let response = await request(app).post("/real-estate").send(mockReq.body);
      expect(response.body).toEqual(propertyData);
      expect(response.status).toEqual(202);
      expect(propertyPrototype.getProperty).toHaveBeenCalledWith(
        mockReq.body.property_id
      );
    });

    errorHandler("/real-estate", "getProperty");
  });

  describe("POST /real-estate/company-assets", () => {
    it("retrieves all company assets successfully", async () => {
      const mockReq = {
        body: { employee_id: "10e6d4f0-8476-431b-b39a-5e35e2a1b1db" },
      };

      const properties = {
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

      jest
        .spyOn(propertyPrototype, "getAllProperties")
        .mockResolvedValue(properties);

      let response = await request(app)
        .post("/real-estate/company-assets")
        .send(mockReq.body);
      expect(response.body).toEqual(properties);
      expect(response.status).toEqual(200);
      expect(propertyPrototype.getAllProperties).toHaveBeenCalledWith(
        mockReq.body.employee_id
      );
    });

    errorHandler("/real-estate/company-assets", "getAllProperties");
  });
});
