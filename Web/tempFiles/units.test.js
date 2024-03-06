const express = require("express");
const router = require("../Back-End/routes/nested_routes/units");
jest.mock("../../repo/unitMaster");
const UnitMaster = require("../Back-End/repo/unitMaster");
const request = require("supertest");

const app = express();
app.use(express.json());
app.use(router);

describe("Unit Router", () => {
  const unitPrototype = UnitMaster.prototype;

  beforeEach(() => {
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Error-handling
  const errorHandler = async (path, methodName) => {
    it("should handle errors and send 500 response", async () => {
      const err = new Error("Test error");
      let tempPrototype = UnitMaster.prototype;
      jest.spyOn(tempPrototype, `${methodName}`).mockReturnValue(err);

      let response = await request(app).post(`${path}`);
      expect(response.status).toEqual(500);
      expect(response.body.error).toEqual("Internal Server Error");
    });
  };

  describe("POST /register", () => {
    it("registers a new unit successfully", async () => {
      const mockReq = {
        body: {
          unit_id: "12345678-1234-1234-1234-123456789012",
          property_id: "09876543-0987-0987-0987-098765432109",
          unit_type: "Studio",
          floor_number: 1,
          rent: 1500,
        },
      };

      const result = {
        id: mockReq.body.unit_id,
        property_id: mockReq.body.property_id,
        unit_type: mockReq.body.unit_type,
        floor_number: mockReq.body.floor_number,
        rent: mockReq.body.rent,
      };

      jest.spyOn(unitPrototype, "registerUnit").mockResolvedValue({status: 201, data: result});

      let response = await request(app).post("/register").send(mockReq.body);
      expect(response.body.data).toEqual(result);
      expect(response.status).toEqual(201);
      expect(unitPrototype.registerUnit).toHaveBeenCalledWith(mockReq.body);
    });

    errorHandler("/register", "registerUnit");
  });

  describe("POST /get-unit", () => {
    it("retrieves a unit successfully", async () => {
      const mockReq = {
        body: { unit_id: "12345678-1234-1234-1234-123456789012" },
      };

      const unit = {
        id: mockReq.body.unit_id,
        property_id: "09876543-0987-0987-0987-098765432109",
        unit_type: "Studio",
        floor_number: 1,
        rent: 1500,
        status: "Available",
      };

      jest.spyOn(unitPrototype, "getUnit").mockResolvedValue({status: 200, data: unit});

      let response = await request(app).post("/get-unit").send(mockReq.body);
      expect(response.body.data).toEqual(unit);
      expect(response.status).toEqual(200);
      expect(unitPrototype.getUnit).toHaveBeenCalledWith(mockReq.body.unit_id);
    });

    it("handles unit not found", async () => {
        const mockReq = {
            body: { unit_id: "test-unit-id" },
          };
    
          jest.spyOn(unitPrototype, "getUnit").mockResolvedValue(null);
    
          let response = await request(app).post("/get-unit").send(mockReq.body);
          expect(response.body.error).toEqual("Unit not found");
          expect(response.status).toEqual(404);
          expect(unitPrototype.getUnit).toHaveBeenCalledWith(mockReq.body.unit_id);
    });

    errorHandler("/get-unit", "getUnit");
  });

  describe("POST /property-assets", () => {
    it("retrieves property assets successfully", async () => {
      const mockReq = {
        body: { property_id: "12345678-1234-1234-1234-123456789012" },
      };

      const units = [
        {
          id: "1",
          unit_id: "12345678-1234-1234-1234-123456789012",
          property_id: "12345678-1234-1234-1234-123456789012",
          unit_type: "Studio",
          floor_number: 1,
          rent: 1500,
          status: "Available",
        },
        {
          id: "2",
          unit_id: "23456789-2345-2345-2345-234567890123",
          property_id: "12345678-1234-1234-1234-123456789012",
          unit_type: "1 Bedroom",
          floor_number: 2,
          rent: 2000,
          status: "Occupied",
        },
      ];

      jest
        .spyOn(unitPrototype, "getPropertyUnits")
        .mockResolvedValue({status: 200, data: units});

      let response = await request(app)
        .post("/property-assets")
        .send(mockReq.body);
      expect(response.body.data).toEqual(units);
      expect(response.status).toEqual(200);
      expect(unitPrototype.getPropertyUnits).toHaveBeenCalledWith(
        mockReq.body.property_id
      );
    });

    errorHandler("/property-assets", "getPropertyUnits");
  });

});