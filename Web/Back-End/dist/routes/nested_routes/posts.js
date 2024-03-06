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
const postsMaster_1 = __importDefault(require("../../repo/postsMaster"));
const router = express_1.default.Router();
// Create an instance of Posts
const posts = new postsMaster_1.default();
const errorHandler = (err, req, res, next) => {
    res.status(500).json({ error: err.message || 'Internal Server Error' });
};
router.use(errorHandler);
// Middleware endpoint handler for /create route
router.post('/create', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postData = req.body;
        const result = yield posts.createPost(postData);
        res.status(result.status).json(result);
    }
    catch (error) {
        errorHandler(error, req, res, next);
    }
}));
// Middleware endpoint handler for /user-posts route
router.post('/user-posts', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { creator_id } = req.body;
        const result = yield posts.getUserPosts(creator_id);
        res.status(result.status).json(result);
    }
    catch (error) {
        errorHandler(error, req, res, next);
    }
}));
// Middleware endpoint handler for /property-channel-posts route
router.post('/property-channel-posts', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { property_id } = req.body;
        const result = yield posts.getPropertyPosts(property_id);
        res.status(result.status).json(result);
    }
    catch (error) {
        errorHandler(error, req, res, next);
    }
}));
exports.default = router;
