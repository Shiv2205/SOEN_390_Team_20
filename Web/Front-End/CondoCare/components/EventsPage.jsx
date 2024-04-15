import React, { useState, useEffect } from "react";
import { Navigation } from "./DashboardComponents/navigation.jsx";
import "../styles/EventsPage.css";

const EventsPage = ({ userData, setUserData }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // const response = await fetch("/events/getAllEvents");
      //   const data = await response.json();
      //   setEvents(data);

      const listOfEvents = [
        {
          title: "Birthday Party",
          date_and_time: "2024-06-15 18:00",
          location: "123 Main Street, Anytown",
          description:
            "Come celebrate my birthday with food, drinks, and music!",
        },
        {
          title: "Conference",
          date_and_time: "2024-07-20 09:00",
          location: "Conference Center, Downtown",
          description:
            "Join us for a day of insightful talks and networking opportunities.",
        },
        {
          title: "Workshop",
          date_and_time: "2024-08-10 13:30",
          location: "Community Center, Park Avenue",
          description:
            "Learn new skills and techniques in our hands-on workshop.",
        },
        {
          title: "Music Festival",
          date_and_time: "2024-09-05 16:00",
          location: "City Park, Riverside",
          description:
            "Enjoy live music from various artists and food from local vendors.",
        },
        {
          title: "Art Exhibition",
          date_and_time: "2024-10-15 11:00",
          location: "Art Gallery, Downtown",
          description:
            "Explore stunning artworks from emerging and established artists.",
        },
      ];

      setEvents(listOfEvents);
    };

    fetchData();
  }, []);

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
      const host = userData.account_id;

      // Create event data object
      const eventData = {
        name: eventName,
        host: host,
        description: eventDescription,
        location: eventLocation,
        timestamp: eventTimestamp,
      };

      // Send POST request to backend
      const SERVER = import.meta.env.VITE_SERVER_BASE_URL;
      const response = await fetch(`${SERVER}/events/newEvent`, {
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

// function randomDateTime(start, end) {
//   const randomDate = new Date(
//     start.getTime() + Math.random() * (end.getTime() - start.getTime())
//   );
//   const hours = String(Math.floor(Math.random() * 24)).padStart(2, "0");
//   const minutes = String(Math.floor(Math.random() * 60)).padStart(2, "0");
//   const dateTimeString = `${
//     randomDate.toISOString().split("T")[0]
//   } ${hours}:${minutes}`;
//   return dateTimeString;
// }

export default EventsPage;
