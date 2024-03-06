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
const accountsMaster_1 = __importDefault(require("../repo/accountsMaster")); // Assuming this is a TypeScript module
const router = express_1.default.Router();
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const formData = req.body;
    if (Object.keys(formData).length === 0) {
        res.status(400).send({ response: "Data not received" });
        return;
    }
    const dbExpert = new accountsMaster_1.default();
    try {
        const dbResponse = yield dbExpert.registerUser(formData);
        if (dbResponse instanceof Error)
            throw new Error();
        const statusCode = dbResponse.status;
        if (statusCode === 400) {
            const errResponse = dbResponse;
            throw new Error(errResponse.message);
        }
        res.status(statusCode).send({ response: "Successfully registered user." });
    }
    catch (error) {
        res.status(500).send({ response: error.message || "An error occurred" });
    }
}));
exports.default = router;
