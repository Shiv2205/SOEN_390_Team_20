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
class PropertyMaster {
    constructor() {
        this.dbController = DBControllerFactory_1.default.createInstance();
    }
    registerNewProperty(propertyDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.dbController.createNewProperty(propertyDetails);
            }
            catch (error) {
                const err = error;
                return err;
            }
        });
    }
    getProperty(property_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.dbController.getProperty(property_id);
            }
            catch (error) {
                const err = error;
                return err;
            }
        });
    }
    getAllProperties(employee_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.dbController.getAllProperties(employee_id);
            }
            catch (error) {
                const err = error;
                return err;
            }
        });
    }
}
exports.default = PropertyMaster;
