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
const unitMaster_1 = __importDefault(require("../../repo/unitMaster"));
const router = express_1.default.Router();
const unit = new unitMaster_1.default();
// Middleware to handle errors consistently
const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send({ message: err.message || 'Something went wrong!' });
};
router.use(errorHandler);
// Middleware endpoint handler for /register route
router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unitData = req.body;
        const result = yield unit.registerUnit(unitData);
        res.status(result.status).json(result);
    }
    catch (error) {
        next(error); // Propagate the error to the error handler
    }
}));
// Middleware endpoint handler for /get-unit route
router.post('/get-unit', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { unit_id } = req.body;
        const result = yield unit.getUnit(unit_id);
        if (!result) {
            res.status(404).json({ error: 'Unit not found' });
            return;
        }
        res.status(result.status).json(result);
    }
    catch (error) {
        next(error); // Propagate the error to the error handler
    }
}));
// Middleware endpoint handler for /property-assets route
router.post('/property-assets', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { property_id } = req.body;
        const units = yield unit.getPropertyUnits(property_id);
        res.status(units.status).json(units);
    }
    catch (error) {
        next(error); // Propagate the error to the error handler
    }
}));
exports.default = router;
