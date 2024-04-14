import express, { Request, Response, NextFunction, Router } from "express";
const router = express.Router();
const { EventData, NotFound } = require('./EventData');
import EventsMaster from "../repo/eventsMaster";
import Events from "../repo/eventsMaster";

const events = new EventsMaster();

router.post("/events", async function (
  req,
  res
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
    // If any error occurs during the process, send 500 Internal Server Error response
    res.status(500).json({ response: "Error creating event", error: error.message });
  }
});

module.exports = router;
