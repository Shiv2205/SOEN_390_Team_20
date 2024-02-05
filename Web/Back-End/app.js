const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fs = require("fs/promises");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const signUpRouter = require("./routes/signup");

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const initializeDB = async () => {
  const dataFilePath = path.join(__dirname, "data/user_data.json");
  try {
    // Check if the file exists
    await fs.access(dataFilePath);

    // File exists, no need to initialize
  } catch (error) {
    // File doesn't exist, initialize it with an empty array
    await fs.writeFile(dataFilePath, "[]");
  }
};

initializeDB();

app.use("/", indexRouter);
app.use("/users", usersRouter);
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
