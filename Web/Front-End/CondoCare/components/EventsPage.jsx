import "../styles/EventsPage.css";
import { Navigation } from "./DashboardComponents/navigation.jsx";
import React, { useState, useEffect } from "react";
import JsonData from "./LandingPageComponents/data.json";
import { MiniProfile } from "./DashboardComponents/miniProfile.jsx";

const EventsPage = ({ userData, setUserData }) => {
  const [landingPageData, setLandingPageData] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setLandingPageData(JsonData);
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    // Generate 10 fake event entries
    const fakeEvents = [];
    for (let i = 1; i <= 10; i++) {
      const event = {
        name: `Event ${i}`,
        date: randomDate(new Date(2024, 3, 1), new Date(2024, 3, 30)), // Generate random date within April 2024
      };
      fakeEvents.push(event);
    }
    setEvents(fakeEvents);
  }, []);

  return (
    <div className="dashboard-owner">
      <Navigation />
      <MiniProfile userData={userData} setUserData={setUserData} />
      <div className="events-table">
        <h2>Events</h2>
        <table>
          <thead>
            <tr className="table-headers">
              <th>Name</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <td>{event.name}</td>
                <td>{event.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
    .toISOString()
    .split("T")[0];
}

export default EventsPage;
