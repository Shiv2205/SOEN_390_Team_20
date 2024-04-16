import express, { Request, Response, NextFunction, Router } from "express";
import AccountsMaster from "../repo/accountsMaster";
import { PublicUserData, UserCredentials } from "../types/DBTypes";

const router: Router = express.Router();

router.post(
  "/",
  async function (
    req: Request<{}, {}, UserCredentials>,
    res: Response<{response: string, loginData: PublicUserData} | {response: string}>,
    next: NextFunction
  ) {
    let formData = req.body;

    if (Object.keys(formData).length === 0) {
      res.status(400).send({ response: "Data not received" });
      return;
    }

    try {
      let dbExpert = new AccountsMaster();
      let userDetails = await dbExpert.getUserDetails(
        formData.email,
        formData.password
      );
      if (!(userDetails instanceof Error)) {
        res
          .status(userDetails.status)
          .send({
            response: "User logged in successfully!",
            loginData: userDetails.data,
          });
      }
      else throw new Error("Invalid credentials");
    } catch (error) {
      const err: Error = error as Error;
      res.status(500).send({ response: "error" });
    }
  }
);

export default router;
