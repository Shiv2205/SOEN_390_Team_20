const express = require("express");
const router = express.Router();
const PropertyMaster = require("../repo/propertyMaster");
const unitsHandler = require("./nested_routes/units");
const postsHandler = require("./nested_routes/posts");

const property = new PropertyMaster();

router.use("/units", unitsHandler);
router.use("/posts", postsHandler);

// Middleware to handle errors consistently
const errorHandler = (err, req, res, next) => {
  res.status(500).send({ message: 'Something went wrong!'});
};
router.use(errorHandler);

// 1. /register
router.post('/register', async (req, res, next) => {
  try {
    const result = await property.registerNewProperty(req.body);
    res.status(result.status).json(result);
  } catch (error) {
    errorHandler(error, req, res, next); // Pass to error-handling middleware
  }
});

// 2. /real-estate
router.post("/real-estate", async (req, res, next) => {
  try {
    const property_data = await property.getProperty(req.body.property_id);
    res.status(property_data.status).json(property_data);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
});

// 3. /real-estate/company-assets
router.post('/real-estate/company-assets', async (req, res, next) => {
  if (!employee_id || typeof employee_id !== "string") {
    return res
      .status(400)
      .send({ error: "Missing required field or wrong data type" }); // bad request
  }
  try {
    let employee_id = req.body.employee_id;
    if (!employee_id || typeof(employee_id) !== 'string'){
      // bad request
      return res.status(400).send({error: "Missing required field or wrong data type"});
  }
    const properties = await property.getAllProperties(employee_id);
    res.json(properties);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
});

module.exports = router;
