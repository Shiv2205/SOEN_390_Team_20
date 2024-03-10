import express, { Request, Response, NextFunction, Router } from "express";
import DBControllerFactory from "../Factory/DBControllerFactory";

const router: Router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  res.json({ status: "Server listening on port 3000" });

  /* FOR TESTING  PURPOSES ONLY! REMOVE LATER!!!!!111 
  //let initDB = await DBControllerFactory.createInstance().initialize();//.populate();
  let populateDB = await DBControllerFactory.createInstance().populate();
  res.send({ populateDB});*/
});

export default router;
