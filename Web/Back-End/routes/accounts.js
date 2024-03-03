const express = require('express');
const router = express.Router();
const AccountsMaster = require("../repo/accountsMaster");

const accounts = new AccountsMaster();

// Middleware to handle errors consistently
const errorHandler = (err, req, res, next) => {
  res.status(500).send({ message: 'Something went wrong!'});
};
router.use(errorHandler);

// 1. /register
router.post("/register", async (req, res, next) => {
  try {
    const response = await accounts.registerUser(req.body);
    res.status(response.status).json({ ...response });
  } catch (error) {
    errorHandler(error, req, res, next); // Pass to error-handling middleware
  }
});

// 2. /users
router.post("/users", async (req, res, next) => {
  try {
    const { status, data } = await accounts.getUserDetails(
      req.body.email,
      req.body.password
    );
    res.status(status).json({status, data});
  } catch (error) {
    errorHandler(error, req, res, next);
  }
});

// 3. /register/employee
router.post("/register/employee", async (req, res, next) => {
  try {
    const result = await accounts.registerEmployee(req.body);
    res.status(result.status).json(result);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
});

// 4. /employees
router.post("/employees", async (req, res, next) => {
  try {
    const employeeDetails = await accounts.getEmployeeDetails(
      req.body.email,
      req.body.password
    );
    res.status(employeeDetails.status).json(employeeDetails);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
});

//5. //employees/property-agents
router.post("/employees/property-agents", async (req, res, next) => {
  try {
    const employees = await accounts.getPropertyEmployees(req.body.property_id);
    res.status(employees.status).json(employees);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
});

module.exports = router;