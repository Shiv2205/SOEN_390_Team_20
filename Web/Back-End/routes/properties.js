const express = require('express');
const router = express.Router();
const PropertyMaster = require('../repo/propertyMaster');
const unitsHandler = require('./nested_routes/units');
const postsHandler = require('./nested_routes/posts');

const property = new PropertyMaster();

router.use('/units', unitsHandler);
router.use('/posts', postsHandler);

// Middleware to handle errors consistently
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// 1. /register
router.post('/register', async (req, res) => {
  try {
    const result = await property.registerNewProperty(req.body);
    res.json(result);
  } catch (error) {
    next(error); // Pass to error-handling middleware
  }
});

// 2. /real-estate
router.post('/real-estate', async (req, res, next) => {
  try {
    const property_data = await property.getProperty(req.body.property_id);
    res.json(property_data);
  } catch (error) {
    next(error);
  }
});

// 3. /real-estate/company-assets
router.post('/real-estate/company-assets', async (req, res) => {
  try {
    const properties = await property.getAllProperties(req.body.employee_id);
    res.json(properties);
  } catch (error) {
    next(error);
  }
});

module.exports = router;