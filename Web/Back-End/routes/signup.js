const express = require("express");
const router = express.Router();
const accountsMaster = require('../repo/accountsMaster');

/* The code block `router.post("/", async (req, res, next) => { ... })` is defining a route handler for
a POST request to the URL ("/signup") of the server. */
router.post("/", async (req, res, next) => {
  let formData = req.body;
  console.log(formData);

  if (Object.keys(formData).length === 0) {
    res.status(400).send({ response: "Data not received" });
    return;
  }

  let dbExpert = new accountsMaster();
  try {
    let dbResponse = await dbExpert.registerUser(formData);
    if(dbResponse.status === 201) 
      res.status(dbResponse.status).send({ response: "User added successfully!" });
    else
      res.status(dbResponse.status).send({ response: dbResponse.message });
  } 
  catch (error) {
    res.status(500).send({ response: error.message });
  }
  
});

module.exports = router;
