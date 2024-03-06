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
router.post("/", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let formData = req.body;
        if (Object.keys(formData).length === 0) {
            res.status(400).send({ response: "Data not received" });
            return;
        }
        try {
            let dbExpert = new accountsMaster_1.default();
            let userDetails = yield dbExpert.getUserDetails(formData.email, formData.password);
            if (userDetails.status === 202)
                res
                    .status(userDetails.status)
                    .send({
                    response: "User logged in successfully!",
                    loginData: userDetails.data,
                });
            else
                throw new Error("Something went wrong during login process");
        }
        catch (error) {
            const err = error;
            res.status(500).send({ response: err.message });
        }
    });
});
exports.default = router;
