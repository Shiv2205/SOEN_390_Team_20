const { error } = require('console');
const express = require('express');
const router = express.Router();
const fs = require('fs/promises');
const path = require('path');

//#################################### For testing Need to remove ##################################################
const log = console.log;

router.post('/', async (req, res, next) => {
    let formData = req.body;
    
    if(!formData)
        res.send({response: "Data not received"});

    try {
        let dataFilePath = path.join(process.cwd(), "data/user_data.json");
        // Read existing data from the file
        const existingData = await fs.readFile(dataFilePath, 'utf-8');
        const userData = JSON.parse(existingData);

        userData.map((data, index) => {
            if(data.email === formData.email)
                throw new error('This email address is already in use');
        })
        // Add the new user
        userData.push(formData);

        // Write the updated data back to the file
        await fs.writeFile(dataFilePath, JSON.stringify(userData, null, 2));

        res.status(201).send({response: 'User added successfully!'});
    } catch (error) {
        res.status(500).send({response: error.message});
    }
});

module.exports = router;