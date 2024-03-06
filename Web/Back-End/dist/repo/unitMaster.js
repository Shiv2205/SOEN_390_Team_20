"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DBControllerFactory_1 = __importDefault(require("../Factory/DBControllerFactory"));
class UnitMaster {
    constructor() {
        this.dbController = DBControllerFactory_1.default.createInstance();
    }
    /**
     * The function `registerUnit` asynchronously registers a new unit with specified details in a
     * database.
     * @returns The `registerUnit` function is returning the result of `this.dbController.createNewUnit`
     * after awaiting its completion.
     */
    registerUnit(unit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.dbController.createNewUnit(unit);
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * The function `getUnit` asynchronously retrieves a unit from the database using its ID and handles
     * any errors that occur.
     * @param unit_id - The `unit_id` parameter is the unique identifier of the unit you want to retrieve
     * from the database. It is used to fetch the specific unit's information from the database.
     * @returns The `getUnit` function is returning the result of `this.dbController.getUnit(unit_id)`
     * after awaiting its completion.
     */
    getUnit(unit_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.dbController.getUnit(unit_id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * The function `getPropertyUnits` asynchronously retrieves all units associated with a given
     * property ID using a database controller.
     * @param property_id - The `property_id` parameter is the unique identifier or key associated with a
     * specific property in a database. It is used to retrieve information or data related to that
     * particular property, such as its units in this case.
     * @returns The `getPropertyUnits` function is returning a promise that resolves to the result of
     * calling `this.dbController.getAllUnits(property_id)`.
     */
    getPropertyUnits(property_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.dbController.getAllUnits(property_id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = UnitMaster;
