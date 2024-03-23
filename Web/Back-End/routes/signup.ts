import express, { Request, Response, NextFunction, Router } from "express";
import AccountsMaster from "../repo/accountsMaster"; // Assuming this is a TypeScript module
import { UserData } from "../types/DBTypes";

const router: Router = express.Router();

/**
 * API route handler for registering a new user.
 * 
 * @param req - Request object with user data in body
 * @param res - Response object
 * @param next - Next function for error handling
 * 
 * @returns A Promise that resolves to an object with a response message indicating the result of user registration.
 * The returned object has the following structure:
 * 
 * {
 *   response: string;
 * }
 */
router.post(
  "/",
  async (req: Request<{}, {}, UserData>, res: Response, next: NextFunction) => {
    const formData = req.body;

    if (Object.keys(formData).length === 0) {
      res.status(400).send({ response: "Data not received" });
      return;
    }

    const dbExpert = new AccountsMaster();
    try {
      const dbResponse = await dbExpert.registerUser(formData);

      if (dbResponse instanceof Error) throw dbResponse;

      res.status(dbResponse.status).send({ response: "Successfully registered user." });
    } catch (error) {
      res.status(400).send({ response: (error as Error).message || "An error occurred" });
    }
  }
);

export default router;
