const express = require("express");
const router = express.Router();
const accountsMaster = require('../repo/accountsMaster');

/* The code block `router.post("/", async (req, res, next) => { ... })` is defining a route handler for
a POST request to the URL ("/signup") of the server. */
router.post("/", async (req, res, next) => {
  let formData = req.body;

  if (Object.keys(formData).length === 0) {
    res.status(400).send({ response: "Data not received" });
    return;
  }

  try {
    let dbExpert = new accountsMaster();
    if(dbExpert.registerUser(formData)) 
      res.status(201).send({ response: "User added successfully!" });
    dbExpert.close();
  } 
  catch (error) {
    res.status(500).send({ response: error.message });
  }
  
});

module.exports = router;
