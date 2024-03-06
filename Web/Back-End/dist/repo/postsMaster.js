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
class PostsMaster {
    constructor() {
        this.dbController = DBControllerFactory_1.default.createInstance();
    }
    /**
     * The function `createPost` asynchronously creates a new post in a database with specified
     * properties.
     * @returns The `createPost` function is returning the result of `this.dbController.createNewPost({
     * property_id, creator_id, content, replied_to})` after awaiting its completion.
     */
    createPost({ property_id, creator_id, content, replied_to = "" }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.dbController.createNewPost({ property_id, creator_id, content, replied_to });
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * The function `getUserPosts` asynchronously retrieves all posts created by a specific user from the
     * database.
     * @param creator_id - The `creator_id` parameter is the unique identifier of the user whose posts
     * you want to retrieve.
     * @returns The `getUserPosts` function is returning the result of calling
     * `this.dbController.getAllUserPosts(creator_id)` after awaiting its completion.
     */
    getUserPosts(creator_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.dbController.getAllUserPosts(creator_id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * The function `getPropertyPosts` asynchronously retrieves all posts related to a specific property
     * ID using a database controller.
     * @param property_id - The `property_id` parameter is the unique identifier or key associated with a
     * specific property. It is used to retrieve all posts related to that particular property from the
     * database.
     * @returns The `getPropertyPosts` function is returning the result of calling
     * `getAllPropertyPosts(property_id)` from the `dbController`. This function is an asynchronous
     * function that fetches all property posts related to the given `property_id`. The function is using
     * `await` to wait for the promise to resolve before returning the result.
     */
    getPropertyPosts(property_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.dbController.getAllPropertyPosts(property_id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = PostsMaster;
