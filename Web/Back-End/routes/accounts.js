const AccountsMaster = require("../repo/accountsMaster");

const accounts = new AccountsMaster();

// Middleware to handle errors consistently
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// 1. /register
app.post("/register", async (req, res) => {
  try {
    const account_id = await accounts.registerUser(req.body);
    res.json({ account_id });
  } catch (error) {
    next(error); // Pass to error-handling middleware
  }
});

// 2. /users
app.post("/users", async (req, res) => {
  try {
    const { status, public_data } = await accounts.getUserDetails(
      req.body.email,
      req.body.password
    );
    res.status(status).json(public_data);
  } catch (error) {
    next(error);
  }
});

// 3. /register/employee
app.post("/register/employee", async (req, res) => {
  try {
    const result = await accounts.registerEmployee(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// 4. /employees
app.post("/employees", async (req, res) => {
  try {
    const employeeDetails = await accounts.getEmployeeDetails(
      req.body.email,
      req.body.password
    );
    res.json(employeeDetails);
  } catch (error) {
    next(error);
  }
});

//5. //employees/property-agents
app.post("/employees/property-agents", async (req, res) => {
  try {
    const employees = await accounts.getPropertyEmployees(req.body.property_id);
    res.json(employees);
  } catch (error) {
    next(error);
  }
});
