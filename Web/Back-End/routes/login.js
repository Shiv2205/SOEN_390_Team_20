var express = require("express");
var router = express.Router();
const getUserData = require("../util/getUserData");

/* GET home page. */
router.post("/", async function (req, res, next) {
  let formData = req.body;

  if (Object.keys(formData).length === 0) {
    res.status(400).send({ response: "Data not received" });
    return;
  }

  try {
    const userData = await getUserData();

    let userExists = false;
    let userDetails = {};
    userData.map((data, index) => {
      if (data.email === formData.email && data.password === formData.password){
        userExists = true;
        userDetails = data;
      }
    });

    if (!userExists) throw new Error("Email or password is incorrect");

    res
      .status(201)
      .send({ response: "User logged in successfully!", loginData: userDetails });
  } catch (error) {
    res.status(500).send({ response: error.message });
  }
});

module.exports = router;
