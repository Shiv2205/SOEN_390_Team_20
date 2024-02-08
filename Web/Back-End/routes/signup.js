const { error } = require("console");
const express = require("express");
const router = express.Router();
const fs = require("fs/promises");
const path = require("path");
const getUserData = require("../util/getUserData");

//#################################### For testing Need to remove ##################################################
const log = console.log;

router.post("/", async (req, res, next) => {
  let formData = req.body;

  if (Object.keys(formData).length === 0) {
    res.status(400).send({ response: "Data not received" });
    return;
  }

  try {
    let currentDBPath = "user_data.json"; //test_user_data.json
    let dataFilePath = path.join(process.cwd(), `data/${currentDBPath}`);
    const userData = getUserData();

    userData.map((data, index) => {
      if (data.email === formData.email)
        throw new Error("This email address is already in use");
    });
    // Add the new user
    userData.push(formData);

    // Write the updated data back to the file
    await fs.writeFile(dataFilePath, JSON.stringify(userData, null, 2));

    res.status(201).send({ response: "User added successfully!" });
  } catch (error) {
    res.status(500).send({ response: error.message });
  }
});

module.exports = router;
