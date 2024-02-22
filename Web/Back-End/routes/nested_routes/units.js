const express = require('express');
const router = express.Router();
const UnitMaster = require('../../repo/unitMaster');

// Create an instance of Unit
const unit = new UnitMaster();

// Middleware endpoint handler for /register route
router.post('/register', async (req, res) => {
    try {
        const unitData = req.body; 
        const result = await unit.registerUnit(unitData);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Middleware endpoint handler for /get-unit route
router.post('/get-unit', async (req, res) => {
    try {
        const { unit_id } = req.body;
        const unit = await unit.getUnit(unit_id);
        if (!unit) {
            res.status(404).json({ error: 'Unit not found' });
            return;
        }
        res.json(unit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Middleware endpoint handler for /property-assets route
router.post('/property-assets', async (req, res) => {
    try {
        const { property_id } = req.body; 
        const units = await unit.getPropertyUnits(property_id);
        res.json(units);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
