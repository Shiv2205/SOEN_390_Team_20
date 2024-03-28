import express, { Request, Response, NextFunction, Router } from "express";
import AccountsMaster from "../repo/accountsMaster";
import { PublicUserData, UserCredentials } from "../types/DBTypes";

const router: Router = express.Router();

/**
 * API route handler for user login.
 * 
 * @param req - Request object with user credentials in body
 * @param res - Response object with optional login data
 * @param next - Next function for error handling
 * 
 * @returns A Promise that resolves to an object with login response or rejects with an error.
 * The returned object has the following structure:
 * 
 * If login is successful:
 * {
 *   response: string;
 *   loginData: {
 *     fullname: string;
 *     email: string;
 *     phone_number?: string;
 *     profile_picture?: string;
 *     account_id: string;
 *     account_type: string;
 *   };
 * }
 * 
 * If login fails:
 * {
 *   response: string;
 * }
 */

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
      res.status(500).send({ response: err.message });
    }
  }
);

export default router;
