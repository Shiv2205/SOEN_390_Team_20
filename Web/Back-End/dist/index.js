"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const login_1 = __importDefault(require("./routes/login"));
const users_1 = __importDefault(require("./routes/users"));
const signup_1 = __importDefault(require("./routes/signup"));
const properties_1 = __importDefault(require("./routes/properties"));
const accounts_1 = __importDefault(require("./routes/accounts"));
// Express app
const app = (0, express_1.default)();
// Handle CORS
const corsOptions = {
    origin: ['http://localhost:5173', 'chrome-extension://amknoiejhlmhancpahfcfcfhllgkpbld', 'https://soen-390-team-20.vercel.app/']
};
// Utils
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
// Routes
app.use('/', users_1.default);
app.use('/login', login_1.default);
app.use('/signup', signup_1.default);
app.use('/accounts', accounts_1.default);
app.use('/properties', properties_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404, 'Page not found'));
});
// Error handler
app.use(function (err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // Render the error page
    res.status(err.status || 500);
    res.json({ error: 'Page not found. Index.ts' }); // Adjusted error message
});
exports.default = app;
