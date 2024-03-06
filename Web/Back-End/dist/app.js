"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const port = process.env.PORT || 3000;
// Start the server
const server = index_1.default.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
// Handle SIGINT signal
process.on('SIGINT', () => {
    // Close any resources like database connections
    // For example:
    // db.close();
    // Close the Express server
    server.close(() => {
        console.log('Express server closed');
        // Exit the process
        process.exit();
    });
});
