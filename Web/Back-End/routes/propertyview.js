const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const PropertyMaster = require('../repo/propertyMaster');

const pm = new PropertyMaster();


router.use(bodyParser.json()); //to parse JSON req body

router.post('/', (req, res, next) => {
    let account_id = req.body.account_id;
    if (!account_id || typeof(account_id) !== 'string'){
        return res.status(400).send({error: "Missing required field or wrong data type"});  // bad request
    }
    console.log(account_id);

    //Lets use method getAllProperties to query db
    let {propertyInfo}  = pm.getAllProperties(account_id); 
    console.log(propertyInfo);
    res.send({response: propertyInfo});
});


module.exports = router;