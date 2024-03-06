"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// DBControllerFactory.js
const DBController_1 = __importDefault(require("../controllers/DBController"));
class DBControllerFactory {
    static createInstance() {
        return new DBController_1.default();
    }
}
exports.default = DBControllerFactory;
