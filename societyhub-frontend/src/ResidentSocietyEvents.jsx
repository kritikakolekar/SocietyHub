import { useEffect, useState } from "react";
import "./ResidentSocietyEvents.css";

function ResidentSocietyEvents({ onBack }) {
  const [events, setEvents] = useState([]);
  useEffect(() => {
  fetch("http://localhost:8080/societyhub/api/events")
    .then((response) => response.json())
    .then((data) => {
      const formattedEvents = data.map((event) => ({
        id: event.id,
        name: event.eventName,
        date: event.eventDate,
        time: event.eventTime,
        location: event.location,
        description: event.description,
      }));

      setEvents(formattedEvents);
    })
    .catch((error) => {
      console.error("Error loading events:", error);
    });
  }, []);

  return (
    <div className="resident-events-page">

      <div className="resident-events-header">

        <button
          className="events-back-button"
          onClick={onBack}
        >
          ← Back to Dashboard
        </button>

        <div>
          <span className="events-label">
            COMMUNITY ACTIVITIES
          </span>

          <h1>Society Events</h1>

          <p>
            Discover upcoming events and activities happening in your society.
          </p>
        </div>

      </div>

      <div className="resident-events-summary">

        <div className="event-summary-card">
          <span>Upcoming Events</span>
          <strong>{events.length}</strong>
        </div>

        <div className="event-summary-card">
          <span>Next Event</span>
          <strong>25 Sep</strong>
        </div>

        <div className="event-summary-card">
          <span>Community Activities</span>
          <strong>Active</strong>
        </div>

      </div>

      <div className="resident-events-card">

        <div className="resident-events-card-header">
          <div>
            <h2>Upcoming Events</h2>
            <p>
              Events and activities organized by society management
            </p>
          </div>
        </div>

        <div className="resident-events-list">

          {events.map((event) => (
            <div
              className="resident-event-item"
              key={event.id}
            >

              <div className="resident-event-date">
                <span>
                  {event.date.split(" ")[1]}
                </span>

                <strong>
                  {event.date.split(" ")[0]}
                </strong>
              </div>

              <div className="resident-event-content">

                <h3>{event.name}</h3>

                <div className="resident-event-meta">
                  <span>🕐 {event.time}</span>
                  <span>📍 {event.location}</span>
                </div>

                <p>{event.description}</p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default ResidentSocietyEvents;