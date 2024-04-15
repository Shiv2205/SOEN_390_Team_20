import React, { useState, useEffect } from "react";
import { useStore } from "../store/store.js";
import { Navigation } from "./DashboardComponents/navigation.jsx";
import "../styles/EventsPage.css";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [state, dispatch] = useStore();

  const SERVER = import.meta.env.VITE_SERVER_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await getAllEvents(); // Wait for the promise to resolve
        console.log(eventsData.data);
        setEvents(eventsData.data); // Update the events state with the fetched data
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);

  const getAllEvents = async () => {
    const response = await fetch(`${SERVER}events/getEvents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const data = await response.json();
    return data;
  };

  const handleAddEvent = async () => {
    try {
      // Prompt user for event details
      const eventName = window.prompt("Enter event name:");
      if (!eventName) {
        return;
      }

      const eventDescription = window.prompt("Enter event description:");
      if (!eventDescription) {
        return;
      }

      const eventLocation = window.prompt("Enter event location:");
      if (!eventLocation) {
        return;
      }

      const eventDate = window.prompt("Enter event date (YYYY-MM-DD):");
      if (!eventDate) {
        return;
      }

      const eventTime = window.prompt("Enter event time (HH:MM):");
      if (!eventTime) {
        return;
      }

      // Combine date and time strings into a single timestamp
      const eventTimestamp = new Date(
        `${eventDate}T${eventTime}:00`
      ).toISOString();

      //Get host from userDate:
      const host = JSON.parse(localStorage.getItem("userData")).account_id;

      // Create event data object
      const eventData = {
        title: eventName,
        host_id: host,
        description: eventDescription,
        location: eventLocation,
        date_and_time: eventTimestamp,
      };

      // Send POST request to backend
      const response = await fetch(`${SERVER}events/newEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        // Event created successfully
      } else {
        console.error("Error creating event:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="events-page">
      <Navigation />
      <div className="events-table">
        <h2>Events</h2>
        <button onClick={handleAddEvent}>Add Event</button>
        <table>
          <thead>
            <tr className="table-headers">
              <th>Title</th>
              <th>Date and Time</th>
              <th>Location</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <td>{event.title}</td>
                <td>{event.date_and_time}</td>
                <td>{event.location}</td>
                <td>{event.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsPage;
