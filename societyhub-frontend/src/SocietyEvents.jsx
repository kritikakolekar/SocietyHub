import { useEffect, useState } from "react";
import "./SocietyEvents.css";

function SocietyEvents({ onBack }) {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Annual Society Meeting",
      date: "2026-09-25",
      time: "18:00",
      location: "Society Club House",
      description: "Annual meeting for all society residents.",
    },
    {
      id: 2,
      name: "Ganesh Festival Celebration",
      date: "2026-09-28",
      time: "19:30",
      location: "Society Garden",
      description: "Community celebration and cultural program.",
    },
  ]);

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

  const [formData, setFormData] = useState({
    

     
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
  event.preventDefault();

  fetch("http://localhost:8080/societyhub/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      eventName: formData.name,
      eventDate: formData.date,
      eventTime: formData.time + ":00",
      location: formData.location,
      description: formData.description,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Event added successfully");

        setFormData({
          name: "",
          date: "",
          time: "",
          location: "",
          description: "",
        });

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
          });
      }
    })
    .catch((error) => {
      console.error("Error adding event:", error);
      alert("Failed to add event");
    });
};

  const handleDelete = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="events-page">

      <div className="events-header">
        <div>
          <button className="back-button" onClick={onBack}>
            ← Back to Dashboard
          </button>

          <h1>Society Events</h1>

          <p>
            Plan and manage upcoming society activities and events.
          </p>
        </div>

        <div className="events-count">
          <span>📅</span>
          <strong>{events.length}</strong>
          <small>Total Events</small>
        </div>
      </div>

      <div className="event-form-card">
        <h2>➕ Add New Event</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-group">
              <label>Event Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter event name"
                required
              />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Society Garden"
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter event details"
                rows="4"
                required
              />
            </div>

          </div>

          <button className="add-event-button" type="submit">
            Add Event
          </button>

        </form>
      </div>

      <div className="events-section">

        <div className="section-heading">
          <div>
            <h2>Upcoming Events</h2>
            <p>Events scheduled for your society</p>
          </div>
        </div>

        <div className="events-grid">

          {events.map((event) => (
            <div className="event-card" key={event.id}>

              <div className="event-card-top">
                <div className="event-icon">
                  📅
                </div>

                <button
                  className="delete-event-button"
                  onClick={() => handleDelete(event.id)}
                >
                  🗑️
                </button>
              </div>

              <h3>{event.name}</h3>

              <div className="event-detail">
                📆 {event.date}
              </div>

              <div className="event-detail">
                🕒 {event.time}
              </div>

              <div className="event-detail">
                📍 {event.location}
              </div>

              <p className="event-description">
                {event.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default SocietyEvents;