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
const express_1 = __importDefault(require("express"));
const propertyMaster_1 = __importDefault(require("../repo/propertyMaster"));
const units_1 = __importDefault(require("./nested_routes/units"));
const posts_1 = __importDefault(require("./nested_routes/posts"));
const router = express_1.default.Router();
const property = new propertyMaster_1.default();
router.use("/units", units_1.default);
router.use("/posts", posts_1.default);
// Middleware to handle errors consistently
const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send({ message: err.message || "Something went wrong!" });
};
router.use(errorHandler);
// 1. /register
router.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield property.registerNewProperty(req.body);
        if (result instanceof Error)
            throw result;
        res.status(result.status).json(result);
    }
    catch (error) {
        next(error); // Propagate the error to the error handler
    }
}));
// 2. /real-estate
router.post("/real-estate", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const property_data = yield property.getProperty(req.body.property_id);
        if (property_data instanceof Error)
            throw property_data;
        res.status(property_data.status).json(property_data);
    }
    catch (error) {
        next(error);
    }
}));
// 3. /real-estate/company-assets
router.post("/real-estate/company-assets", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee_id = req.body.employee_id;
        const properties = yield property.getAllProperties(employee_id);
        res.json(properties);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
