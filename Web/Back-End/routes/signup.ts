import express, { Request, Response, NextFunction, Router } from "express";
import AccountsMaster from "../repo/accountsMaster"; // Assuming this is a TypeScript module
import { UserData } from "../types/DBTypes";

const router: Router = express.Router();

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

      if (dbResponse instanceof Error) throw new Error();

      const statusCode = dbResponse.status;
      if (statusCode === 400) {
        const errResponse = dbResponse as {
          status: number;
          message: string;
        };
        throw new Error(errResponse.message);
      }

      res.status(statusCode).send({ response: "Successfully registered user." });
    } catch (error: any) {
      res.status(500).send({ response: error.message || "An error occurred" });
    }
  }
);

export default router;
