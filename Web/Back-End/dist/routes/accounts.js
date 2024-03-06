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
const accountsMaster_1 = __importDefault(require("../repo/accountsMaster"));
const router = express_1.default.Router();
const accounts = new accountsMaster_1.default();
// Middleware to handle errors consistently
const errorHandler = (err, req, res, next) => {
    res.status(500).send({ message: "Something went wrong!" });
};
router.use(errorHandler);
// 1. /register
router.post("/register", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield accounts.registerUser(req.body);
        if (response instanceof Error)
            throw new Error();
        const statusCode = response.status;
        if (statusCode === 400) {
            const errResponse = response;
            throw new Error(errResponse.message);
        }
        res.status(response.status).json(Object.assign({}, response));
    }
    catch (error) {
        errorHandler(error, req, res, next); // Pass to error-handling middleware
    }
}));
// 2. /users
router.post("/users", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, data } = yield accounts.getUserDetails(req.body.email, req.body.password);
        res.status(status).json({ status, data });
    }
    catch (error) {
        errorHandler(error, req, res, next);
    }
}));
// 3. /register/employee
router.post("/register/employee", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield accounts.registerEmployee(req.body);
        res.status(result.status).json(result);
    }
    catch (error) {
        errorHandler(error, req, res, next);
    }
}));
// 4. /employees
router.post("/employees", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeDetails = yield accounts.getEmployeeDetails(req.body.email, req.body.password);
        res.status(employeeDetails.status).json(employeeDetails);
    }
    catch (error) {
        errorHandler(error, req, res, next);
    }
}));
// 5. /employees/property-agents
router.post("/employees/property-agents", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield accounts.getPropertyEmployees(req.body.property_id);
        res.status(employees.status).json(employees);
    }
    catch (error) {
        errorHandler(error, req, res, next);
    }
}));
exports.default = router;
