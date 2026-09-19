import { useEffect, useState } from "react";
import "./Notices.css";

function Notices({ onBack }) {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Society Annual Meeting",
      category: "Meeting",
      date: "2026-09-25",
      priority: "High",
      description:
        "All residents are requested to attend the annual society meeting at the clubhouse.",
    },
    {
      id: 2,
      title: "Water Supply Maintenance",
      category: "Maintenance",
      date: "2026-09-22",
      priority: "Medium",
      description:
        "Water supply will remain unavailable from 10:00 AM to 1:00 PM due to maintenance work.",
    },
    {
      id: 3,
      title: "Ganesh Festival Celebration",
      category: "Event",
      date: "2026-09-28",
      priority: "Low",
      description:
        "Residents are invited to participate in the Ganesh Festival celebration in the society garden.",
    },
  ]);
useEffect(() => {
  fetch("http://localhost:8080/societyhub/api/notices")
    .then((response) => response.json())
    .then((data) => {
      const formattedNotices = data.map((notice) => ({
        id: notice.id,
        title: notice.title,
        category: "General",
        date: notice.noticeDate,
        priority: "Medium",
        description: notice.message,
      }));

      setNotices(formattedNotices);
    })
    .catch((error) => {
      console.error("Error loading notices:", error);
    });
}, []);
  const [formData, setFormData] = useState({
    title: "",
    category: "General",
    date: "",
    priority: "Medium",
    description: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newNotice = {
      id: Date.now(),
      ...formData,
    };

    setNotices([newNotice, ...notices]);

    setFormData({
      title: "",
      category: "General",
      date: "",
      priority: "Medium",
      description: "",
    });
  };

  const deleteNotice = (id) => {
    setNotices(
      notices.filter((notice) => notice.id !== id)
    );
  };

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      notice.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      notice.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="notices-page">

      <div className="notices-header">

        <button
          className="back-button"
          onClick={onBack}
        >
          ← Back to Dashboard
        </button>

        <h1>Notices</h1>

        <p>
          Create and manage important society announcements
          for residents.
        </p>

      </div>

      <div className="notice-stats">

        <div className="notice-stat-card">
          <div className="notice-stat-icon">📢</div>

          <div>
            <span>Total Notices</span>
            <strong>{notices.length}</strong>
          </div>
        </div>

        <div className="notice-stat-card">
          <div className="notice-stat-icon">🔴</div>

          <div>
            <span>High Priority</span>
            <strong>
              {
                notices.filter(
                  (notice) =>
                    notice.priority === "High"
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="notice-stat-card">
          <div className="notice-stat-icon">📅</div>

          <div>
            <span>Upcoming</span>
            <strong>
              {
                notices.filter(
                  (notice) =>
                    notice.date >=
                    new Date()
                      .toISOString()
                      .split("T")[0]
                ).length
              }
            </strong>
          </div>
        </div>

      </div>

      <div className="notice-form-card">

        <h2>Create New Notice</h2>

        <form onSubmit={handleSubmit}>

          <div className="notice-form-grid">

            <div className="form-group">
              <label>Notice Title</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter notice title"
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="General">General</option>
                <option value="Meeting">Meeting</option>
                <option value="Maintenance">
                  Maintenance
                </option>
                <option value="Event">Event</option>
                <option value="Security">Security</option>
                <option value="Emergency">Emergency</option>
              </select>
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
              <label>Priority</label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write the notice details..."
                required
              />
            </div>

          </div>

          <button
            className="add-notice-button"
            type="submit"
          >
            + Publish Notice
          </button>

        </form>

      </div>

      <div className="notice-list-card">

        <div className="notice-list-header">

          <div>
            <h2>Notice Board</h2>

            <p>
              Manage announcements published for residents.
            </p>
          </div>

          <div className="notice-filters">

            <input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />

            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value)
              }
            >
              <option value="All">All Categories</option>
              <option value="General">General</option>
              <option value="Meeting">Meeting</option>
              <option value="Maintenance">
                Maintenance
              </option>
              <option value="Event">Event</option>
              <option value="Security">Security</option>
              <option value="Emergency">
                Emergency
              </option>
            </select>

          </div>

        </div>

        <div className="notice-grid">

          {filteredNotices.length === 0 ? (
            <div className="no-notices">
              No notices found.
            </div>
          ) : (
            filteredNotices.map((notice) => (
              <div
                className="notice-card"
                key={notice.id}
              >

                <div className="notice-card-top">

                  <span className="notice-category">
                    {notice.category}
                  </span>

                  <span
                    className={`notice-priority ${notice.priority.toLowerCase()}`}
                  >
                    {notice.priority}
                  </span>

                </div>

                <h3>{notice.title}</h3>

                <div className="notice-date">
                  📅 {notice.date}
                </div>

                <p>{notice.description}</p>

                <button
                  className="delete-notice-button"
                  onClick={() =>
                    deleteNotice(notice.id)
                  }
                >
                  Delete
                </button>

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default Notices;