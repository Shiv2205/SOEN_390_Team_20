var express = require('express');
var router = express.Router();
const DBControllerFactory = require('../Factory/DBControllerFactory');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  //let initDB = await DBControllerFactory.createInstance().initialize();//.populate();
  let populateDB = await DBControllerFactory.createInstance().populate();
  // try {
  //   await initDB.createNewEmployee({
  //     fullname: "John Doe",
  //     email: "johndoe@gmail.com",
  //     password: "qwerty123",
  //     type: "manager"
  //   //   phoneNumber: "5145672536",
  //   //   profilePicture: "https://imgs.search.brave.com/SUOF32ke7atehZbBLAoUSciXLQGAtA1kC2kJh_84Gig/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMzLmFscGhhY29k/ZXJzLmNvbS8yMTYv/MjE2MTY3LmpwZw",
  //   });
  // } catch (error) {
  //   console.log(error);
  // } 
  res.send({ populateDB});
});

module.exports = router;

// initDB.createNewPublicUser({
//     fullname: "Shivam Vee",
//     email: "shivam@gmail.com",
//     password: "qwerty123",
//     phoneNumber: "5145672536",
//     profilePicture: "https://imgs.search.brave.com/SUOF32ke7atehZbBLAoUSciXLQGAtA1kC2kJh_84Gig/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMzLmFscGhhY29k/ZXJzLmNvbS8yMTYv/MjE2MTY3LmpwZw",
//   });
  // await initDB.createNewEmployee({
  //   fullname: "Shivam Vee",
  //   email: "shivam@gmail.com",
  //   password: "qwerty123",
  //   property_id: "",
  //   type: "admin"
  // });
  // console.log(await initDB.getEmployee({email: "shivam@gmail.com", password: "qwerty123"}));