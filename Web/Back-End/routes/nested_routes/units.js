const express = require('express');
const router = express.Router();
const UnitMaster = require('../../repo/unitMaster');

// Create an instance of Unit
const unit = new UnitMaster();

const errorHandler = (err, req, res, next) => {
    if(err) res.status(500).json({ error: 'Internal Server Error' });
};

router.use(errorHandler);

// Middleware endpoint handler for /register route
router.post('/register', async (req, res, next) => {
    try {
        const unitData = req.body; 
        const result = await unit.registerUnit(unitData);
        res.status(result.status).json(result);
    } catch (error) {
        errorHandler(error, req, res, next);
    }
});

// Middleware endpoint handler for /get-unit route
router.post('/get-unit', async (req, res, next) => {
    try {
        const { unit_id } = req.body;
        const result = await unit.getUnit(unit_id);
        if (!result) {
            res.status(404).json({ error: 'Unit not found' });
            return;
        }
        res.status(result.status).json(result);
    } catch (error) {
        errorHandler(error, req, res, next);
    }
});

// Middleware endpoint handler for /property-assets route
router.post('/property-assets', async (req, res, next) => {
    try {
        const { property_id } = req.body; 
        const units = await unit.getPropertyUnits(property_id);
        res.status(units.status).json(units);
    } catch (error) {
        errorHandler(error, req, res, next);
    }
});

module.exports = router;
