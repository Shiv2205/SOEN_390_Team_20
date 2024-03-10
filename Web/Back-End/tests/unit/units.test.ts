import express from "express";
import request from "supertest";
import router from "../../routes/nested_routes/units"; // Update this with your router file name
import UnitMaster from "../../repo/unitMaster";
import { UnitDetails } from "../../types/DBTypes";

const app = express();
app.use(express.json());
app.use(router);

describe("Unit Router", () => {
  const unitPrototype = UnitMaster.prototype;

  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Error-handling
  const errorHandler = async (path: string, methodName: string) => {
    it("should handle errors and send 500 response", async () => {
      const err = new Error("Test Error");
      let tempPrototype = UnitMaster.prototype;
      let methodSpy;

      switch (methodName) {
        case "registerUnit":
          methodSpy = jest.spyOn(tempPrototype, "registerUnit");
          break;
        case "getPropertyUnits":
          methodSpy = jest.spyOn(tempPrototype, "getPropertyUnits");
          break;
        default:
          methodSpy = jest.spyOn(tempPrototype, "getUnit");
          break;
      }

      methodSpy.mockResolvedValue(err);

      let response = await request(app).post(path);
      expect(response.status).toEqual(500);
      expect(response.body.message).toEqual("Test Error");
    });
  };

  describe("POST /register", () => {
    it("registers a new unit successfully", async () => {
      const mockReq = {
        body: {
          property_id: "12345678-1234-1234-1234-123456789012",
          size: 10,
          monthly_rent: 2205,
          condo_fee: 220500,
          condo_balance: 220500,
        },
      };

      const result = {
        unit_id: "123-test",
        status: 201,
      };

      jest
        .spyOn(unitPrototype, "registerUnit")
        .mockResolvedValue(result);

      let response = await request(app).post("/register").send(mockReq.body);
      expect(response.body).toEqual(result);
      expect(response.status).toEqual(201);
      expect(unitPrototype.registerUnit).toHaveBeenCalledWith(mockReq.body);
    });

    errorHandler("/register", "registerUnit");
  });

  describe("POST /get-unit", () => {
    it("retrieves a unit successfully", async () => {
      const mockReq = {
        body: { unit_id: "123-test" },
      };

      const unit: UnitDetails = {
        unit_id: "123-test",
        property_id: "12345678-1234-1234-1234-123456789012",
        size: 10,
        monthly_rent: 2205,
        condo_fee: 220500,
        condo_balance: 220500,
      };

      jest
        .spyOn(unitPrototype, "getUnit")
        .mockResolvedValue({ status: 200, data: unit });

      let response = await request(app).post("/get-unit").send(mockReq.body);
      expect(response.body.data).toEqual(unit);
      expect(response.status).toEqual(200);
      expect(unitPrototype.getUnit).toHaveBeenCalledWith(mockReq.body.unit_id);
    });

    it("handles unit not found", async () => {
      const mockReq = {
        body: { unit_id: "test-unit-id" },
      };

      jest.spyOn(unitPrototype, "getUnit").mockResolvedValue(new Error());

      let response = await request(app).post("/get-unit").send(mockReq.body);
      expect(response.body.message).toEqual("Something went wrong!");
      expect(response.status).toEqual(500);
      expect(unitPrototype.getUnit).toHaveBeenCalledWith(mockReq.body.unit_id);
    });

    errorHandler("/get-unit", "getUnit");
  });

  describe("POST /property-assets", () => {
    it("retrieves property assets successfully", async () => {
      const mockReq = {
        body: { property_id: "12345678-1234-1234-1234-123456789012" },
      };

      const units: UnitDetails[] = [
        {
          unit_id: "123-test",
          property_id: "12345678-1234-1234-1234-123456789012",
          size: 10,
          monthly_rent: 2205,
          condo_fee: 220500,
          condo_balance: 220500,
        },
        {
          unit_id: "123-test",
          property_id: "12345678-1234-1234-1234-123456789012",
          size: 10,
          monthly_rent: 2205,
          condo_fee: 220500,
          condo_balance: 220500,
        },
      ];

      jest
        .spyOn(unitPrototype, "getPropertyUnits")
        .mockResolvedValue({ status: 200, data: units });

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
