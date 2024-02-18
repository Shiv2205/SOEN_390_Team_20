var express = require("express");
var router = express.Router();
const accountsMaster = require('../repo/accountsMaster');

/* The code you provided is a route handler for a POST request to the URL ("/login"). */
router.post("/", async function (req, res, next) {
  let formData = req.body;

  if (Object.keys(formData).length === 0) {
    res.status(400).send({ response: "Data not received" });
    return;
  }

  try {
    let dbExpert = new accountsMaster();
    let userDetails = await dbExpert.getUserDetails(formData.email, formData.password);
    if(userDetails)
      res.status(201).send({ response: "User logged in successfully!", loginData: userDetails });
  } 
  catch (error) {
    res.status(500).send({ response: error.message });
  }
  
});

module.exports = router;