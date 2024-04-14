import express, { Request, Response, NextFunction, Router } from "express";
const { EventData, NotFound } = require('./EventData');
import EventsMaster from "../repo/eventsMaster";
import { EventData } from "../types/DBTypes";

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

router.post("/events", async function (
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
    if (eventResult instanceof NotFound) {
      res.status(404).json({ response: "Host not found" });
      return;
    }

    // If no error, send success response with event_id
    res.status(eventResult.status).json({ response: "Event created successfully"});
  } catch (error) {
    errorHandler(error as Error, req, res, next); // Propagate the error to the error handler
  }
});

module.exports = router;
