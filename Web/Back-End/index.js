const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const loginRouter = require("./routes/login");
const usersRouter = require("./routes/users");
const signUpRouter = require("./routes/signup");

//express app
const app = express();

//Handle CORS
const corsOptions = {
  origin: "http://localhost:5173"
};

//Utils
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes
app.use("/", usersRouter);
app.use("/login", loginRouter);
app.use("/signup", signUpRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, "Page not found"));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: "Page not found" });
});

module.exports = app;