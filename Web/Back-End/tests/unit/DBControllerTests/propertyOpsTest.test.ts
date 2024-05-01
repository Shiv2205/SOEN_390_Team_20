import recordExistsTest from "../utils/recordExistsTest";
import DBController from "../../../controllers/DBController";
import fs from "fs";
import { EmployeeData } from "../../../types/DBTypes";

// Mock dependencies
jest.mock("sqlite3", () => ({
    Database: jest.fn(() => ({
        serialize: jest.fn((callback?: (() => void) | undefined): void => {if(callback) callback()}), //if(callback) callback()
        run: jest.fn((query, values?: any) => {}),
        get: jest.fn(
            (
                query,
                values?: any,
                callback?: ((err: Error | null, row: {}) => void) | undefined
            ) => {
                if (callback) callback(null, { count: 0 });
            }
        ),
        all: jest.fn((
            query,
            values?: any,
            callback?: ((err: Error | null, row: [{}]) => void) | undefined
        ) => {
            if (callback) callback(null, [{ count: 0 }]);
        }),
        close: jest.fn(),
    })),
    cached: {
        Database: jest.fn(() => ({
            serialize: jest.fn((callback) => callback()),
            run: jest.fn((query, values) => {}),
            get: jest.fn((query, values, callback) => {
                callback(null, { count: 0 });
            }),
            all: jest.fn((query, values) => {}),
            close: jest.fn(),
        })),
    },
}));

jest.mock("fs", () => ({
    stat: jest.fn(
        (
            path,
            callback: (err: NodeJS.ErrnoException | null, stats: fs.Stats) => void
        ) =>{ callback(null, {} as fs.Stats)}
    ), //((path, callback) => callback(null, {})),
    readFileSync: jest.fn(() => "Test string ;-- String test"),
}));
jest.mock("uuid", () => ({
    v4: jest.fn(() => "mock-uuid"),
}));

describe("Property Operations Test", () => {
    let dbController = new DBController();
    beforeEach(() => {
        dbController.initialize();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Create new Operation", () => {
        let mockRes;
        let operationSpy;
        let testRecord = {
            property_id: "test-property",
            operation_name: "save team 20",
            operation_cost: 420.55
        };

        it("should create a new post", async () => {
            mockRes = { status: 201, operation_id: "mock-uuid" };

            operationSpy = jest.spyOn(dbController, "createPropertyOps");

            await expect(dbController.createPropertyOps(
                testRecord.property_id,
                testRecord.operation_name,
                testRecord.operation_cost)).resolves.toEqual(mockRes);
            expect(operationSpy).toHaveBeenCalledWith(
                testRecord.property_id,
                testRecord.operation_name,
                testRecord.operation_cost);
            expect(dbController.db.run).toHaveBeenCalled();
            expect(dbController.db.run).toHaveBeenCalledWith(
                `INSERT INTO property_operations 
              (operation_id, property_id, operation_name, operation_cost) 
              VALUES (?, ?, ?, ?)`,
                [mockRes.operation_id, testRecord.property_id, testRecord.operation_name,testRecord.operation_cost]
            );
        });
    });

    describe("getPropertyOps", () => {
        let spy;
        let testRecord = {property_id: 'test-operation'};

        it("should resolve to indicate succesful fetch", async () => {
            spy = jest
                .spyOn(dbController, "recordExists")
                .mockResolvedValueOnce(true);

            let getOperationSPy = jest.spyOn(dbController, "getPropertyOps");

            await expect(
                dbController.getPropertyOps(testRecord.property_id)
            ).resolves.toBeTruthy();
            expect(dbController.db.get).toHaveBeenCalled();
            expect(dbController.db.get).toHaveBeenCalledWith(
                (dbController.db.get as jest.Mock).mock.calls[0][0],
                testRecord.property_id,
                (dbController.db.get as jest.Mock).mock.calls[0][2] // callback function is the last argument in this call
            );
            expect(getOperationSPy).toHaveBeenCalledWith(
                testRecord.property_id
            );

            recordExistsTest(spy, {
                tableName: "property_operations",
                fieldName: "property_id",
                value: testRecord.property_id,
            });
        });

        it("should return { status: 400, message: 'Operation does not exist in database.'}", async () => {
            spy = jest
                .spyOn(dbController, "recordExists")
                .mockResolvedValueOnce(false);

            await expect(
                dbController.getPropertyOps(testRecord.property_id)
            ).rejects.toEqual({
                status: 400,
                message: "Operation does not exist in database.",
            });
        });
    });


    describe("updatePropertyOps", () => {
        let spy;
        let testRecord =
            {
            operation_id: 'test-operation-id',
            property_id: 'test-property-id',
            operation_name: "test-name",
            operation_cost: 123.45
            };

        it("should resolve to indicate successful update", async () => {
            spy = jest
                .spyOn(dbController, "recordExists")
                .mockResolvedValueOnce(true);

            let updateOperationSPy = jest.spyOn(dbController, "updatePropertyOps");

            await expect(
                dbController.updatePropertyOps(testRecord.operation_id, testRecord.property_id, testRecord.operation_name,testRecord.operation_cost)
            ).resolves.toBeTruthy();
            expect(dbController.db.run).toHaveBeenCalled();
            expect(dbController.db.run).toHaveBeenCalledWith(
                `UPDATE property_operations 
              SET property_id = ?, operation_name = ?, operation_cost = ?
              WHERE operation_id = ?`,
                [testRecord.property_id, testRecord.operation_name,testRecord.operation_cost, testRecord.operation_id],
            );
            expect(updateOperationSPy).toHaveBeenCalledWith(
                testRecord.operation_id, testRecord.property_id, testRecord.operation_name,testRecord.operation_cost
            );

            recordExistsTest(spy, {
                tableName: "property_operations",
                fieldName: "operation_id",
                value: testRecord.operation_id,
            });
        });

        it("should return { status: 400, message: 'Operation does not exist in database.'}", async () => {
            spy = jest
                .spyOn(dbController, "recordExists")
                .mockResolvedValueOnce(false);

            await expect(
                dbController.updatePropertyOps(testRecord.operation_id, testRecord.property_id, testRecord.operation_name,testRecord.operation_cost)
            ).rejects.toEqual({
                status: 400,
                message: "Operation does not exist in database.",
            });
        });
    });

    describe("deletePropertyOps", () => {
        let spy;
        let testRecord = {operation_id: 'test-operation-id'};

        it("should resolve to indicate successful deletion", async () => {
            spy = jest
                .spyOn(dbController, "recordExists")
                .mockResolvedValueOnce(true);

            let deleteOperationSPy = jest.spyOn(dbController, "deletePropertyOps");

            await expect(
                dbController.deletePropertyOps(testRecord.operation_id)
            ).resolves.toBeTruthy();
            expect(dbController.db.run).toHaveBeenCalled();
            expect(dbController.db.run).toHaveBeenCalledWith(
                `DELETE FROM property_operations WHERE operation_id = ?`,
                testRecord.operation_id,
            );
            expect(deleteOperationSPy).toHaveBeenCalledWith(testRecord.operation_id);

            recordExistsTest(spy, {
                tableName: "property_operations",
                fieldName: "operation_id",
                value: testRecord.operation_id,
            });
        });

        it("should return { status: 400, message: 'Operation does not exist in database.'}", async () => {
            spy = jest
                .spyOn(dbController, "recordExists")
                .mockResolvedValueOnce(false);

            await expect(
                dbController.deletePropertyOps(testRecord.operation_id)
            ).rejects.toEqual({
                status: 400,
                message: "Operation does not exist in database.",
            });
        });
    });
})



