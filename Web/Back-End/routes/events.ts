import express, { Request, Response, NextFunction, Router } from "express";
import EventsMaster from "../repo/eventsMaster";
import { EventData, NotFound } from "../types/DBTypes";

const events = new EventsMaster();
const router = express.Router();

interface Error {
  status?: number;
  message: string;
}

// Middleware to handle errors consistently
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  res.status(status).send({ message: err.message || "Something went wrong!" });
};

router.post("/newEvent", async function (
    req: Request<{}, {}, EventData>,
    res: Response,
  next: NextFunction
) {
  let eventData = req.body;

  if (!eventData || Object.keys(eventData).length === 0) {
    res.status(400).json({ response: "Event data not received" });
    return;
  }

  try {
    // Call the createNewEvent method passing the eventData
    let eventResult = await events.createNewEvent(eventData);

    // Check if the result is a NotFound error
    if ('message' in eventResult) {
      res.status(404).json({ response: "Host not found" });
      return;
    }

    // If no error, send success response with event_id
    res.status(eventResult.status).json({ response: "Event created successfully"});
  } catch (error) {
    errorHandler(error as Error, req, res, next); // Propagate the error to the error handler
  }
});

router.get('/getEvents', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await events.getAllEvents();
        if(result instanceof Error) throw result as Error;
        res.status(result.status).json(result);
    } catch (error) {
        errorHandler(error as Error, req, res, next);
    }
});

export default router;
